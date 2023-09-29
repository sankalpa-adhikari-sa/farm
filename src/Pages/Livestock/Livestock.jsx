import React from 'react'
import { useState } from 'react'
import Button from '../../UI Components/Button'
import { MdPersonAdd } from 'react-icons/md'
import './Livestock.scss'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function Livestock() {
  const [Item, ShowItem]= useState(false)
  const navigate= useNavigate()

  return (
    <div className='LivestockWrapper'>
      <div className="Accordian">
        <Button onClick={()=>{navigate("/livestock/list")}} size="sm" >Livestock LIst</Button>
        <Button onClick={()=>{navigate("/livestock/add")}} variant="success" icon={<MdPersonAdd size={15} />} size="sm" >Add Livestock</Button>
        <Button onClick={()=>{navigate("/livestock/add")}} variant="success" icon={<MdPersonAdd size={15} />} size="sm" >Add Herd</Button>
        {/* <div className="EmployeeCount">
          <span className='CountLabel'>Total Employees :</span><span className='CountValue'> {employee_count}</span> 
        </div> */}
      </div>
      <Outlet/>
        
    </div>
  )
}

export default Livestock