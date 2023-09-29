import React from 'react'
import { useState } from 'react'
import Button from '../../UI Components/Button'
import { MdPersonAdd } from 'react-icons/md'
import './Livestock.scss'
import { useNavigate } from 'react-router-dom'
function Livestock() {
  const [Item, ShowItem]= useState(false)
  const navigate= useNavigate()
  return (
<div className='LivestockWrapper'>
<div className="Accordian">
        <Button text="Add" onClick={()=>{navigate("/livestock/add")}} variant="success" icon={<MdPersonAdd size={15} />} size="sm" >Add</Button>
        <div className="EmployeeCount">
          {/* <span className='CountLabel'>Total Employees :</span><span className='CountValue'> {employee_count}</span>  */}
        </div>
      </div>
        {/* <EmployeeTable/>         */}
    </div>
  )
}

export default Livestock