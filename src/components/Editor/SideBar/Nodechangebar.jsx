import React, {useCallback, useState, useEffect} from 'react';
import { Box, Typography, TextField, MenuItem } from '@mui/material';
import useNodesStateSynced, { nodesMap } from '../../../hooks/useNodesStateSynced';
import useEdgesStateSynced, { edgesMap } from '../../../hooks/useEdgesStateSynced';
import { Button } from "@material-tailwind/react"
import {useStore } from "./../Editingbox2"
import axios from 'axios';
import { request } from "../../../utils/axios-utils"
import {API} from "../../../utils/config";


function Nodechangebar(){

  const [nodeName, setNodeName] = useState("노드 이름 바꾸기");
  const {projectId, setBgColor} = useStore();
  // 🔥 요래요래 이것들은 굳이 안 바꿔도 될 것 같습니다만
  // const [nodes, onNodesChange, setNodes] = useNodesStateSynced();
  // const [edges, onEdgesChange, onConnect] = useEdgesStateSynced();
  // const {onSave} = useStore();
  // 🍁 Nodes Map을 이용해서 현재 노드를 다 불러오는 방법 
  
  //🍎 배경색을 바꿀 수 있게한다 
  const handleColorChange = (event) => {
    setBgColor(event.target.value);
  }

  const onSave = useCallback(() => {
    const nodes = Array.from(nodesMap.values());
    const edges = Array.from(edgesMap.values());
    console.log('nodes: ', nodes);
    console.log('edges: ', edges);
    console.log('Id: ', projectId);
    // 먼저 노드들 보내기
    axios.post(`${API.NODES}/${projectId}`, {
      "nodes" : nodes
    }).then((res , err) => {
      if (res.status === 200) {
         console.log('nodes saved');
      }
      else {console.log(err)}
    })

    axios.post(`${API.EDGES}/${projectId}`, {
      "edges" : edges
    }).then((res , err) => {
      if (res.status === 200) {
         console.log('edges saved');
      }
      else {console.log(err)}
    })
}, [nodesMap, edgesMap, projectId, API.NODES, API.EDGES]);


  
  useEffect(() => {
    // This is your map iteration code 
    nodesMap.forEach((node, nodeId) => {
      if (node.selected === true) {
        node.data = {
            ...node.data,
            label: nodeName
        };
        nodesMap.set(nodeId, node);
      }
    });
  }, [nodeName, nodesMap]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ padding: '5px' }}> 
        <Box sx={{ width: '75%' }}>
            <MenuItem>
            <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            🗂️ 노드 관리툴
            </Typography>
            </MenuItem>

        <Box display="flex" justifyContent="center" alignItems="center"  sx = {{padding: '7px'}}>
            <TextField 
      id="outlined-basic" 
      value= {nodeName}
      onChange={(evt) => setNodeName(evt.target.value)}
      label= "선택한 노드 이름"
      variant="outlined"
      color="secondary"
      fullWidth
      sx={{
        width: '100%', 
        height: '5%',// Adjust the width as needed
        '& .MuiInputLabel-root': {
          fontSize: '14px', // Adjust the font size as needed
        },
        '& .MuiOutlinedInput-input': {
        //   padding: '10px', // Adjust the input padding as needed
          fontSize: '14px', // Adjust the font size as needed
        },
      }}
    />
    </Box>
    <Box display="flex" justifyContent="center" alignItems= "center" >
      <Button type="button" onClick={onSave} > 현재까지 저장 </Button>
      </Box>
      <Box sx = {{padding: '15px'}} display="flex" justifyContent="center" alignItems= "center" >
      배경 바꾸기  :  <input type="color" onChange={handleColorChange}></input>
    </Box>
        </Box>
        </Box>

    )

}





export default Nodechangebar;