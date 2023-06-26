import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const MenuBar =() =>{
    return(
    <div>
        <Paper sx={{width:'60px', position: 'fixed', top: '64px',right: 0, height: '100vh', borderRadius:0, justifyContent: 'center', backgroundColor:'#8F44AD' }}>
            <MenuList>
                <MenuItem>
                <ListItemIcon>
                    <Typography sx={{ color:'white'}}>Tool</Typography>
                </ListItemIcon>
                </MenuItem>
                <Divider variant="middle" sx={{ padding:'8px', borderColor: 'white' }} />
                <MenuItem >
                <ListItemIcon sx={{ p: '5px', color:'white' }} aria-label="menu">
                    <MenuIcon />
                </ListItemIcon>
                </MenuItem>
                <MenuItem>
                <ListItemIcon sx={{ color:'white'}}>
                    <p>icon</p>
                </ListItemIcon>

                </MenuItem>
            </MenuList>
        </Paper>
    </div>
)
}

export default MenuBar;
