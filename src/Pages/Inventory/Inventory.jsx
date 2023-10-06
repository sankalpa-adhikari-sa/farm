import React,{ useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ActionBtn, ActionBtnBlack } from '../../UI Components/CustomButtom'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import {MenuList, Menu,MenuItem,Paper, Box, Typography } from '@mui/material'
import AgricultureIcon from '@mui/icons-material/Agriculture';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import GrassIcon from '@mui/icons-material/Grass';
import { GiCow } from 'react-icons/gi'
import WarehouseIcon from '@mui/icons-material/Warehouse';
import InventoryIcon from '@mui/icons-material/Inventory';
function Inventory() {
    const navigate= useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
    const handleMenuItemClose = (navigate_to) => {
      setAnchorEl(null);
      navigate(navigate_to)
    };
    
  return (
    <div className='InventoryWrapper'>
        <div className="Accordian">
        <ActionBtn onClick={handleMenuClick } 
            sx={{px:2,}}
            color='success' 
            variant='contained' 
            startIcon={
            <PersonAddIcon sx={{fontWeight:"600",height:16}}/>
            }>
                Add 
        </ActionBtn>
        <ActionBtnBlack 
            onClick={()=>{navigate("/inventory/list")}} 
            color='primary' >
                inventory list
        </ActionBtnBlack>

        
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        sx={{mt:2}}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{sx: {width: '200px'}}}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Typography sx={{ml:4}}>hi</Typography>
        <hr />
        <MenuItem sx={{gap:4,justifyContent:"flex-start"}} onClick={()=>handleMenuItemClose("/inventory/add/resource")}>
          <InventoryIcon/>
          <Typography>
            Resource
          </Typography>
        </MenuItem>
        <MenuItem sx={{gap:4,justifyContent:"flex-start"}} onClick={()=>handleMenuItemClose("/inventory/add/equipment")}>
          <AgricultureIcon/>
          <Typography>
            Equipment
          </Typography>
          
        </MenuItem>
        
        <MenuItem sx={{gap:4,justifyContent:"flex-start"}} onClick={()=>handleMenuItemClose("/inventory/add/warehouse")}>
        <WarehouseIcon/>
          <Typography>
            Warehouse
          </Typography>
        </MenuItem>
      </Menu>
     

        </div>
        <Outlet />
    </div>
  )
}

export default Inventory