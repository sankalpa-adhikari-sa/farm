import React,{ useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import {Menu,MenuItem, Typography } from '@mui/material'
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { GiCow } from 'react-icons/gi'
import { PlusCircle,TableProperties, Group, Tractor, Warehouse } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
function Inventory() {
    const navigate= useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
    const handleMenuItemClose = (navigate_to) => {
      setAnchorEl(null);
      navigate(navigate_to)
    };
    const DropdownMenuTriggerCSS="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

    
  return (
    <div >
      <div className='flex justify-between'>
        <Button className="font-bold" variant="outline" onClick={()=>{navigate("/inventory/list")}} >
          <TableProperties className='w-4 h-4 mr-3'/>
          Inventory
        </Button>

        <DropdownMenu className="w-24">
          <DropdownMenuTrigger className={DropdownMenuTriggerCSS}>
            <PlusCircle className='w-4 h-4 mr-3' />
            Add
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" >
            <DropdownMenuLabel>Add</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem  onClick={()=>{navigate("/inventory/add/resource")}} className="h-10"> 
              <GiCow size={24} className='mr-3' />
              Resource
            </DropdownMenuItem>
            <DropdownMenuItem  onClick={()=>{navigate("/inventory/add/equipment")}} className="h-10"> 
              <Tractor className='mr-3 h-4 w-4' />
              Equipment
            </DropdownMenuItem>
            <DropdownMenuItem  onClick={()=>{navigate("/inventory/add/warehouse")}} className="h-10"> 
              <Warehouse className='mr-3 h-4 w-4' />
              Warehouse
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Outlet/>
        
    </div>
  )
}

export default Inventory