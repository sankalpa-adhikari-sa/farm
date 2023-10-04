import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './UI Components/Navbar';
import {useSelector} from 'react-redux'
//Material UI Imports
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import Body from './Pages/Body';
import Sidebar from './UI Components/Sidebar';
import Box from '@mui/material/Box';
import { ToastContainer } from 'react-toastify';
function App() {
  
  const darkMode= useSelector(state => state.ui.mode)
  const SidebarOpen= useSelector(state => state.ui.SidebarOpen)
 
  const theme= createTheme({
    spacing:4,
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
    palette:{
      mode:darkMode,
      primary: {
          main: "#9747FF",
      },
      secondary:{
        main:"#afff47",
      },
      success:{
        main:"#238636"
      },
      alert:{
        main:"#FF4500"
      },
    },
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
  

    
  })

  return (
    <>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{display:"flex"}}>
      <Sidebar/>
      <Navbar/>
      <Body/>
      <ToastContainer
               
               position="bottom-right"
               autoClose={2500}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover={false}
       />
    </Box>

      
      </ThemeProvider>
    </>
  )
}

export default App
