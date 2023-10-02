import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch,useSelector } from 'react-redux';
import {useForm} from 'react-hook-form'
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import InventoryForm from './Forms/InventoryForm';
function InventoryAdd() {
  const form = useForm()
  const dispatch= useDispatch()
  const notify = ()=>{
    toast.success('Livestock Added', {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  const onSubmit=(data) =>{
    // const livestockWithId = {
    //   ...data,
    //   livestock_id: uuidv4(), // Generate a UUIDv4 for the employee ID
    // };    
    // dispatch(addLivestock(livestockWithId))
    form.reset()
    form.clearErrors();
   
    notify()

  }
  return (
    <div>
      <InventoryForm form= {form} onSubmit={onSubmit} />
    </div>
  )
}

export default InventoryAdd