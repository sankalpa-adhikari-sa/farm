import { useState } from 'react'
import './App.css'
import Navbar from './UI Components/Navbar';
//Material UI Imports
import CssBaseline from '@mui/material/CssBaseline';
// import { ThemeProvider } from '@emotion/react';
import Body from './Pages/Body';
import Sidebar from './UI Components/Sidebar';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from "@/components/ui/theme-provider"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()
  return (
    <>
    <QueryClientProvider client={queryClient}>

   
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CssBaseline />
      <div className='flex bg-background h-screen w-screen' >
        <Sidebar/>
      <div className='w-full h-full'>
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

      </div>
      </div>
      <ReactQueryDevtools />
      </ThemeProvider>
    </QueryClientProvider>

      
   

    </>
  )
}

export default App
