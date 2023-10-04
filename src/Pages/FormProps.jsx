import react from 'react'
import { v4 as uuidv4 } from 'uuid';
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

//Toast Notification
const notify = (success_message)=>{
    toast.success(success_message, {
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

// FeedInputInventoryForm props
const handleFeedAdd = (data) =>{
    console.log(data)
    notify("Inventory Added")
        // const inputDate = new Date(data.date_time.$d);

    // const formattedDate = inputDate.toISOString();
    // //for django and also in react-hook-form use this as minimum value for date picker
    //     console.log(formattedDate)
    //     console.log(data.date_time.$d)

}

const handleFeedUpdate = (e) =>{
    e.preventDefault()

}
const RHFAddFeed_input= ()=>{
    const form = useForm()
    return form
}
const RHFUpdateFeed_input= ()=>{
    const form = useForm()
    return form
}

// WarehouseForm props

const handleWarehouseAdd = (data) =>{
    console.log(data)
    notify("Warehouse Added")
}

const handleWarehouseUpdate = (e) =>{
    e.preventDefault()

}
const RHFAddWarehouse= ()=>{
    const form = useForm()
    return form
}
const RHFUpdateWarehouse= ()=>{
    const form = useForm()
    return form
}
export {handleFeedAdd,handleFeedUpdate,RHFAddFeed_input,RHFUpdateFeed_input,
        handleWarehouseAdd,handleWarehouseUpdate,RHFAddWarehouse,RHFUpdateWarehouse }