import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const MenuBar =() =>{
    return(
        <div>
    <Paper sx={{ width: 80,height:'100vh', position: 'fixed', left: 0, display: 'flex', justifyContent: 'center' }}>
      <MenuList dense>
        <ListItemText primaryTypographyProps={{ variant: 'h6' }} disableTypography sx={{ mx:3, my:2}}>Edit</ListItemText>
        <MenuItem>
            <ListItemIcon sx={{ borderBottom: '1px solid gray' }}>
                <img src='/menu_group.png' width={48} />
            </ListItemIcon>
        </MenuItem>
        <MenuItem>
            <ListItemIcon sx={{ borderBottom: '1px solid gray' }}>
                <img src='/menu_node.png' width={48} />
            </ListItemIcon>
        </MenuItem>
        <MenuItem>
            <ListItemIcon sx={{ borderBottom: '1px solid gray' }}>
                <img src='/menu_cal.png' width={48} />
            </ListItemIcon>
        </MenuItem>
        <MenuItem>
            <ListItemIcon sx={{ borderBottom: '1px solid gray' }}>
                <img src='/menu_sunb.png' width={48} />
            </ListItemIcon>
        </MenuItem>
        <MenuItem>
            <ListItemIcon sx={{ borderBottom: '1px solid gray' }}>
                <img src='/menu_data.png' width={48} />
            </ListItemIcon>
        </MenuItem>

        
        <Divider />
      </MenuList>
    </Paper>

        </div>
    )
}

export default MenuBar;
