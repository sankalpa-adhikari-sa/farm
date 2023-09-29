import React, { useState } from 'react'
import './Employees.scss'
import Button from '../../UI Components/Button'
import EmployeeTable from './EmployeeTable';
import { useDispatch,useSelector } from 'react-redux';

import { MdPersonAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
function Employees() {
  const dispatch= useDispatch()
  const employee = useSelector(state => state.employee.Basic_Info);
  const employee_count = useSelector(state => state.employee.Employee_Count);
  // console.log(employee_count)
  // console.log(employee)

  const navigate= useNavigate()


  return (
    <div className='EmployeeWrapper'>
      <div className="Accordian">
        <Button text="Add" onClick={()=>{navigate("/employees/add")}} variant="success" icon={<MdPersonAdd size={15} />} size="sm" >Add</Button>
        <div className="EmployeeCount">
          <span className='CountLabel'>Total Employees :</span><span className='CountValue'> {employee_count}</span> 
        </div>
        <div className="EmployeeCount">
          <span className='CountLabel'>Total Female Employees :</span><span className='CountValue'> {employee_count}</span> 
        </div>
      </div>
        <EmployeeTable/>        
    </div>
  )
}

export default Employees