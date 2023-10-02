import React, { useState } from 'react'
import './Employees.scss'
import Button from '../../UI Components/Button'
import EmployeeTable from './EmployeeTable';
import { useDispatch,useSelector } from 'react-redux';
import { ActionBtn } from '../../UI Components/CustomButtom';
import { MdPersonAdd } from 'react-icons/md';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
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
        <ActionBtn onClick={()=>{navigate("/employees/add")}} sx={{px:1, justifyContent:"center"}} color='success' variant='contained' startIcon={<PersonAddIcon sx={{fontWeight:"600",height:16}}/>}>Add</ActionBtn>
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