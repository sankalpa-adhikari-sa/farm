import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "./Navbar.scss"
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme,toggleSidebar } from '../Features/UI/UISlice';
import { styled } from '@mui/material/styles';
import { Button } from '@/components/ui/button';

import MuiAppBar  from '@mui/material/AppBar';

import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from "@/components/ui/theme-provider"
import { Mail,Moon, Sun,Settings, Cog } from "lucide-react"
import { Separator } from '@/components/ui/separator';



function Navbar() {
  const {theme, setTheme } = useTheme()
  const sidebarWidth= useSelector(state => state.ui.SidebarWidth)
  const navigate= useNavigate()

  const dispatch= useDispatch()
  const mode= useSelector(state => state.ui.mode)
  const darkMode= useSelector(state => state.ui.darkMode)
  const SidebarOpen= useSelector(state => state.ui.SidebarOpen)
  const handleModeChange=()=>{
    dispatch(toggleTheme(!darkMode))
  }
  const handleSidebar = ()=>{
    dispatch(toggleSidebar(!SidebarOpen))
  }
 

  return (
    <div className='flex flex-col'>
      <div className='flex h-12 justify-between pt-1 space-x-6 pr-3'>
        <Button onClick={handleSidebar} variant="ghost" size="icon">
          <MenuIcon />
        </Button>
        <div>
        <Button onClick={()=> navigate("/settings")}  variant="ghost" size="icon">
          <Settings />
        </Button>
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")} color="inherit">
                {theme === 'dark' ? <Sun /> : <Moon />}
          </Button>
        </div>
        
      </div>
      <div>
      <Separator/>  
      </div>
    </div>
  )
}

export default Navbar