import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export const Introduction = () => {
  return (
    <>
    <Typography gutterBottom variant="h3" sx={{ marginLeft: 8 }}>사무직과 현장직을 사진으로 이어주는 업무 협업 툴</Typography>
    <Box 
      sx={{ 
        width: '100%', 
        height: '100vh', // Use '100vh' to make the image take up the full screen height
        overflow: 'hidden', 
      }}
    >
      <img 
        src='./group.png' 
        alt='image description'
        sx={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', // Use 'cover' or 'contain' as needed
        }} 
      />
    </Box>
    </>
  );
}
