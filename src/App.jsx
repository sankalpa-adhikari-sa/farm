import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './UI Components/Navbar';
import {useSelector} from 'react-redux'
//Material UI Imports
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Body from './Pages/Body';
import Sidebar from './UI Components/Sidebar';
import Box from '@mui/material/Box';

function App() {

  const darkMode= useSelector(state => state.ui.mode)
  const SidebarOpen= useSelector(state => state.ui.SidebarOpen)
  const theme= createTheme({
    components: {
      MuiToolbar: {
          styleOverrides: {
              dense: {
                  height: 48,
                  minHeight: 48,
                  
              }
          }
      }
  },
    spacing:4,
    palette:{
      mode:darkMode,
    },
    
  })

  return (
    <>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{display:"flex"}}>
      <Sidebar/>
      <Navbar/>
      <Body/>
    </Box>

      
      </ThemeProvider>
    </>
  )
}

export default App
