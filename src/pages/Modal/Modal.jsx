import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {request} from '../../utils/axios-utils'
import { useNavigate } from 'react-router-dom';

import { usePjtFromModalStore } from '../../components/store'


{/* 🌿서버에 post보내는 함수 */}
const postProject = (data) => {
    return request({url: 'project', method: 'POST', data })
  }

export const Modal = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(true);
    const [projectName, setProjectName] = useState("");
    // const [projectId, setProjectId] = useState(null);

    {/* 🌿 pjt 관련 값을 store에 저장할 수 있도록 함수를 불러옵시다. */}
    const setPjtName = usePjtFromModalStore(state => state.setPjtName);
    const setPjtId = usePjtFromModalStore(state => state.setPjtId);

    const handleProjectNameChange = (event) => {
        setProjectName(event.target.value);
    };

    const handleSend = async () => {
        try {
            const response = await postProject({name: projectName});
            console.log(response);
            const id = response.data.id;
            // setProjectId(id);

            {/* 🌿 받은 값을 store에 저장합시다. */}
            setPjtId(id);
            setPjtName(projectName)

          console.log(`Project created with ID: ${id}`);
          navigate(`/newproject/${id}`);
        } catch (error) {
          console.error(error);
        }
      };
    

    return (
        <Dialog
            open={showModal}
            onClose={() => setShowModal(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"새 프로젝트 이름을 써주세요! 👨🏻‍💼"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    새 프로젝트 이름
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Project Name"
                    type="text"
                    fullWidth
                    value={projectName}
                    onChange={handleProjectNameChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => navigate('/Main')} color="primary">
                    Cancel
                </Button>
                <Button 
                onClick={handleSend}
                 color="primary" autoFocus>
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
}