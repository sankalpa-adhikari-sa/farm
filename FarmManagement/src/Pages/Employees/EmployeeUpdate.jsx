import React, { useState } from 'react'
import EmployeeForm from './Form/EmployeeForm'
import {useForm} from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { updateEmployee } from '../../Features/Employees/EmployeeSlice'
import Snackbar from '../../UI Components/Snackbar'
import { MdCancel } from 'react-icons/md'
function EmployeeUpdate() {
    const [showSnackbar, setShowSnackbar]= useState(false)
    
    const {id} = useParams()
    let employee = useSelector(state => state.employee.Basic_Info).find((item) => item.id === id);
    const form= useForm({
      defaultValues:employee
    })
    
    const dispatch= useDispatch()
    const handleUpdate= (data) => {
      const updatedEmployee= {
        ...employee,
        ...data
      }
        dispatch(updateEmployee(updatedEmployee))
        setShowSnackbar(true)
    }
    const handleSnackbarClose= () => {
      setShowSnackbar(false)
    }
  return (
    <div>
        <EmployeeForm form= {form} onSubmit={handleUpdate}  submitBtnText="Update"/>
        { showSnackbar &&
        <Snackbar onClose={handleSnackbarClose} variant="" icon={<MdCancel size={20} />} >
        Updated 
      </Snackbar>
        }
        
    </div>
  )
}

export default EmployeeUpdate