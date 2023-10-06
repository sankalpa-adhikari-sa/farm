import React from 'react'
import { useState } from 'react'
import './Livestock.scss'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ActionBtnBlack,ActionBtn } from '../../UI Components/CustomButtom'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
function Livestock() {
  const [Item, ShowItem]= useState(false)
  const navigate= useNavigate()

  return (
    <div className='LivestockWrapper'>
      <div className="Accordian">
        <ActionBtnBlack onClick={()=>{navigate("/livestock/list")}} color='primary' >Livestock list</ActionBtnBlack>
        <ActionBtn onClick={()=>{navigate("/livestock/add")}} sx={{px:2,}}color='success' variant='contained' startIcon={<PersonAddIcon sx={{fontWeight:"600",height:16}}/>}>Add Livestock</ActionBtn>
        <ActionBtn sx={{px:2}}color='success' variant='contained' startIcon={<PersonAddIcon sx={{fontWeight:"600",height:16}}/>}>Add Herd</ActionBtn>

      </div>
      <Outlet/>
        
    </div>
  )
}

export default Livestock