import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../utils/config';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useStore } from './Editingbox2';


const Modal = () => {
    const [projectName, setProjectName] = useState('');
    const {setProjectId} =  useStore();
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        setShowModal(true);
    }, []);

    const handleInputChange = (e) => {
        setProjectName(e.target.value);
    };

    const handleSend = async () => {
        try {
          console.log({ name: projectName });
          const response = await axios.post(`${API.NPROJECT}`, { name: projectName });
          console.log(response.data);
          // Store the id returned by the response
          setProjectId(response.data.id);
          // Close the modal
          setShowModal(false);
        } catch (err) {
          console.error(err);
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
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setShowModal(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSend} color="primary" autoFocus>
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
