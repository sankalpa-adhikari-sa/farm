import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch,useSelector } from 'react-redux';
import { addEmployee } from '../../Features/Employees/EmployeeSlice';
import {useForm} from 'react-hook-form'
import LivestockForm from './Form/LivestockForm';

function LivestockAdd() {
    const form= useForm()
    const dispatch= useDispatch()
    const onSubmit=(data) =>{
      console.log(data)

    }
  return (
    <div>
        <LivestockForm form= {form} onSubmit={onSubmit}  submitBtnText="Submit"/>

    </div>
  )
}

export default LivestockAdd