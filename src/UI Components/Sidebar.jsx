import React from 'react'
import { useSelector } from 'react-redux';
import { Drawer } from '@mui/material'
import { useTheme } from '@emotion/react';
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
    </Drawer>
  )
}

export default Sidebar