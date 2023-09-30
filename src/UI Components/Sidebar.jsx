import React from 'react'
import { useSelector } from 'react-redux';
import { Drawer } from '@mui/material'
function Sidebar() {
  const drawerWidth = 150;
  const SidebarOpen= useSelector(state => state.ui.SidebarOpen)
  return (
    <Drawer
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box"
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