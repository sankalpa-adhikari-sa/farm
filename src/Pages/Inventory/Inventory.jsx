import React from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ActionBtn, ActionBtnBlack } from '../../UI Components/CustomButtom'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
function Inventory() {
    const navigate= useNavigate()
  return (
    <div className='InventoryWrapper'>
        <div className="Accordian">
        <ActionBtn onClick={()=>{navigate("/inventory/add")}} 
            sx={{px:2,}}
            color='success' 
            variant='contained' 
            startIcon={
            <PersonAddIcon sx={{fontWeight:"600",height:16}}/>
            }>
                Add 
        </ActionBtn>
        <ActionBtnBlack 
            onClick={()=>{navigate("/inventory/list")}} 
            color='primary' >
                inventory list
        </ActionBtnBlack>
        

        </div>
        <Outlet />
    </div>
  )
}

export default Inventory