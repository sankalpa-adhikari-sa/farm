import React from 'react'
import "./LivestockAdd.scss"
import { v4 as uuidv4 } from 'uuid';
import { useDispatch,useSelector } from 'react-redux';
import { addLivestock } from '../../Features/Livestock/LivestockSlice';
import {useForm} from 'react-hook-form'
import LivestockForm from './Form/LivestockForm';
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
function LivestockAdd() {
    const form= useForm({
      defaultValues:{
        dam_id:null,
  
      }
    })
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
      const livestockWithId = {
        ...data,
        livestock_id: uuidv4(), // Generate a UUIDv4 for the employee ID
      };    
      dispatch(addLivestock(livestockWithId))
      form.reset()
      form.clearErrors();
     
      notify()

    }
  return (
    <div>
      <div className="LiveStockHeader">
        New Livestock Form
      </div>
        <LivestockForm form= {form} onSubmit={onSubmit}  submitBtnText="Submit"/>

    </div>
  )
}

export default LivestockAdd