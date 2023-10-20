import React from 'react'
import EmployeeForm from './Form/EmployeeForm'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch,useSelector } from 'react-redux';
import { addEmployee } from '../../Features/Employees/EmployeeSlice';
import {useForm} from 'react-hook-form'

function EmployeeAdd() {
    const form= useForm()
    const dispatch= useDispatch()
    const onSubmit = (data) => {
      const employeeWithId = {
        ...data,
        id: uuidv4(), // Generate a UUIDv4 for the employee ID
      };    
      dispatch(addEmployee(employeeWithId))
  
      form.reset();
      form.clearErrors();
    }
  return (
    <div>
        <EmployeeForm form= {form} onSubmit={onSubmit} submitBtnText="Submit"/>
    </div>
  )
}

export default EmployeeAdd