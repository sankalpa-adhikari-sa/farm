import React from 'react'
import { useSelector } from 'react-redux';
import { Drawer } from '@mui/material'
import { useTheme } from '@emotion/react';
import { NavLink } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import { Button } from '@/components/ui/button';
import { GiCow } from 'react-icons/gi'

import { Mail,Users,Home,ShoppingBasket } from "lucide-react"
function Sidebar() {
 
  
  const SidebarOpen= useSelector(state => state.ui.SidebarOpen)
  const theme= useTheme()
  return (
    <aside className={`bg-background h-screen w-44 ${SidebarOpen ? "block":"hidden"}`}>
      <div className='flex flex-col space-y-2 my-2 mx-2'>
        <NavLink  to="/">
          {({isActive}) => ( 
          <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start font-semibold" >
            <Home className='w-4 h-4 mr-2'/>
            Home
          </Button>

          )}
        </NavLink>
        <NavLink  to="/employees">
          {({isActive}) => ( 
          <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start" >
            <Users className='w-4 h-4 mr-2'/>
            Employees
          </Button>
          )}
        </NavLink>
        <NavLink  to="/livestock">
          {({isActive}) => ( 
          <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start" >
            <GiCow size={18} className='mr-2'/>
            Livestock
          </Button>
          )}
        </NavLink>
        <NavLink  to="/inventory">
          {({isActive}) => ( 
          <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start" >
            <ShoppingBasket className='w-4 h-4 mr-2'/>
            Inventory
          </Button>
          )}
        </NavLink>
       
      </div>

    </aside>
   
  )
}

export default Sidebar