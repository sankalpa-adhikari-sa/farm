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
const drawerWidth= 150
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

function Navbar() {

  const dispatch= useDispatch()
  const mode= useSelector(state => state.ui.mode)
  const SidebarOpen= useSelector(state => state.ui.SidebarOpen)
  const handleModeChange=()=>{
    dispatch(toggleTheme(true))
  }
  const handleSidebar = ()=>{
    dispatch(toggleSidebar(!SidebarOpen))
  }
  const ig="#9747FF"

  return (
    <>
    <AppBar  open={SidebarOpen} color="default" 
            className={`NavbarWrapper ${mode === 'dark' ? 'dark-theme' : 'light-theme'}`}
            position='fixed'>
      <Toolbar variant='dense'>
      <IconButton onClick={handleSidebar} aria-label="sidebar"  color="primary">
        <MenuIcon />
      </IconButton>
        <NavLink 
            to="/"
            className={({isActive, isPending}) =>
            isPending ? "NavPen": isActive ? "NavAct": ""}>
                Home
        </NavLink>
        <NavLink 
            to="/farm"
            className={({isActive, isPending}) =>
            isPending ? "NavPen": isActive ? "NavAct": ""}>
                Farm
        </NavLink>
        <NavLink 
            to="/livestock"
            className={({isActive, isPending}) =>
            isPending ? "NavPen": isActive ? "NavAct": ""}>
                Livestock
        </NavLink>
        <NavLink 
            to="/employees"
            className={({isActive, isPending}) =>
            isPending ? "NavPen": isActive ? "NavAct": ""}>
                Employees
        </NavLink>
        <IconButton sx={{ ml: 1,float:"right" }} onClick={handleModeChange} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

      </Toolbar>
    </AppBar>

    </>
  )
}

export default Navbar