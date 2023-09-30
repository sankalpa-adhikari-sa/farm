import React from 'react'
import { useSelector } from 'react-redux';
import { Drawer } from '@mui/material'
import { useTheme } from '@emotion/react';
function Sidebar() {
  const drawerWidth = 150;
  const SidebarOpen= useSelector(state => state.ui.SidebarOpen)
  const theme= useTheme()
  return (
    <Drawer
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
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