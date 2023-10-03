import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.scss"
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme,toggleSidebar } from '../Features/UI/UISlice';
import { styled, useTheme } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import  Box from '@mui/material/Box'; // Box at top creates type error
import MuiAppBar  from '@mui/material/AppBar';
import { Toolbar } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open, sidebarwidth }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    
  }),
  ...(open && {
    width: `calc(100% - ${sidebarwidth}px)`,
    marginLeft: `${sidebarwidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    })
  })
}));

function Navbar() {
  const sidebarWidth= useSelector(state => state.ui.SidebarWidth)
  

  const dispatch= useDispatch()
  const mode= useSelector(state => state.ui.mode)
  const SidebarOpen= useSelector(state => state.ui.SidebarOpen)
  const handleModeChange=()=>{
    dispatch(toggleTheme(true))
  }
  const handleSidebar = ()=>{
    dispatch(toggleSidebar(!SidebarOpen))
  }
 

  return (
    <>
    <AppBar sidebarwidth={sidebarWidth}  open={SidebarOpen} color="default" 
            className={`NavbarWrapper ${mode === 'dark' ? 'dark-theme' : 'light-theme'}`}
            position='fixed' elevation={0}>
      <Toolbar variant='dense' sx={{boxShadow:"none"}}>
      <IconButton onClick={handleSidebar} aria-label="sidebar"  color="primary">
        <MenuIcon />
      </IconButton>

        
        <IconButton sx={{ ml: 1,float:"right" }} onClick={handleModeChange} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

      </Toolbar>
    </AppBar>

    </>
  )
}

export default Navbar