import React from 'react'
import { useSelector } from 'react-redux';
import { Drawer } from '@mui/material'
import { useTheme } from '@emotion/react';
import { NavLink } from 'react-router-dom'
import { RouterBtn } from './CustomButtom';
import HomeIcon from '@mui/icons-material/Home';
function Sidebar() {
  const sidebarWidth= useSelector(state => state.ui.SidebarWidth)
  
  const SidebarOpen= useSelector(state => state.ui.SidebarOpen)
  const theme= useTheme()
  return (
    <Drawer
    sx={{
      width: sidebarWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: `${sidebarWidth}px`,
        boxSizing: "border-box",

        backgroundColor: "#313131",
      }
    }}
    variant="persistent"
    anchor="left"
    open={SidebarOpen}
   
    >
      <NavLink to="/"
              className={({isActive, isPending}) =>
              isPending ? "NavPen": isActive ? "NavAct": ""}>
        <RouterBtn sx={{ m:3, width:`calc(100% - ${theme.spacing(3*2)})`, gap:5}} variant='contained' startIcon={<HomeIcon/>}>Home</RouterBtn>
      </NavLink>
      <NavLink 
            to="/farm"
            className={({isActive, isPending}) =>
            isPending ? "NavPen": isActive ? "NavAct": ""}>
        <RouterBtn sx={{ m:3, width:`calc(100% - ${theme.spacing(3*2)})`, gap:5}} variant='contained' startIcon={<HomeIcon/>}>Farm</RouterBtn>
        </NavLink>
        <NavLink 
            to="/livestock"
            className={({isActive, isPending}) =>
            isPending ? "NavPen": isActive ? "NavAct": ""}>
        <RouterBtn sx={{ m:3, width:`calc(100% - ${theme.spacing(3*2)})`, gap:5}} variant='contained' startIcon={<HomeIcon/>}>Livestock</RouterBtn>
        </NavLink>
        <NavLink 
            to="/employees"
            className={({isActive, isPending}) =>
            isPending ? "NavPen": isActive ? "NavAct": ""}>
        <RouterBtn sx={{ m:3, width:`calc(100% - ${theme.spacing(3*2)})`, gap:5}} variant='contained' startIcon={<HomeIcon/>}>Employees</RouterBtn>
        </NavLink>
    </Drawer>
  )
}

export default Sidebar