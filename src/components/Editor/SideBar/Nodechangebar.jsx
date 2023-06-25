import React, {useState, useEffect} from 'react';

import { Box, Typography, TextField, MenuItem } from '@mui/material';
// import {nodesMap} from '../../../hooks/useNodesStateSynced';
import useEdgesStateSynced from '../../../hooks/useEdgesStateSynced';
import useNodesStateSynced from '../../../hooks/useNodesStateSynced';
import { useStore } from './../store';


function Nodechangebar(){
    const ydoc = useStore(state => state.ydoc);
    const nodesMap = ydoc ? ydoc.getMap('nodes') : null;
    const [nodeName, setNodeName] = useState("Change Node name");
 // call the hook here

 useEffect(() => {
    // Check that nodesMap is defined
    if (nodesMap) {
      nodesMap.forEach((node, nodeId) => {
        if (node.selected === true && node.data.label !== nodeName) {
          node.data = {
            ...node.data,
            label: nodeName,
          };
          nodesMap.set(nodeId, node);
          console.log('rerendering');
        }
      });
    }
  }, [nodeName, nodesMap]);

  

    return (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ padding: '5px' }}> 
        <Box sx={{ width: '75%' }}>
            <MenuItem>
            <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            🗂️ 노드 관리툴
            </Typography>
            </MenuItem>

            <Box sx = {{padding: '7px'}}>
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
        </Box>
        </Box>

    )

}





export default Nodechangebar;