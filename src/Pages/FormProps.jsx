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
const handleResourceAdd = (data) =>{
    console.log(data)
    notify("Inventory Added")
        // const inputDate = new Date(data.date_time.$d);

    // const formattedDate = inputDate.toISOString();
    // //for django and also in react-hook-form use this as minimum value for date picker
    //     console.log(formattedDate)
    //     console.log(data.date_time.$d)

}

const handleResourceUpdate = (e) =>{
    e.preventDefault()

}
const RHFAddResource= ()=>{
    const form = useForm()
    return form
}
const RHFUpdateResource= ()=>{
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
// OthersForm props

const handleOtherInventoryAdd = (data) =>{
    console.log(data)
    notify("Inventory Added")
}

const handleOtherInventoryUpdate = (e) =>{
    e.preventDefault()

}
const RHFAddOtherInventory= ()=>{
    const form = useForm()
    return form
}
const RHFUpdateOtherInventory= ()=>{
    const form = useForm()
    return form
}
// EquipmentForm props

const handleEquipmentAdd = (data) =>{
    console.log(data)
    notify("Equipment Added")
}

const handleEquipmentUpdate = (e) =>{
    e.preventDefault()

}
const RHFAddEquipment= ()=>{
    const form = useForm()
    return form
}
const RHFUpdateEquipment= ()=>{
    const form = useForm()
    return form
}
// MedicalForm props

const handleMedicalInventoryAdd = (data) =>{
    console.log(data)
    notify("Medical Inventory Added")
}

const handleMedicalInventoryUpdate = (e) =>{
    e.preventDefault()

}
const RHFAddMedicalInventory= ()=>{
    const form = useForm()
    return form
}
const RHFUpdateMedicalInventory= ()=>{
    const form = useForm()
    return form
}
// ChemicalInventory props

const handleChemicalInventoryAdd = (data) =>{
    console.log(data)
    notify("Chemical Added")
}

const handleChemicalInventoryUpdate = (e) =>{
    e.preventDefault()

}
const RHFAddChemicalInventory= ()=>{
    const form = useForm()
    return form
}
const RHFUpdateChemicalInventory= ()=>{
    const form = useForm()
    return form
}
export {handleResourceAdd,handleResourceUpdate,RHFAddResource,RHFUpdateResource,
        handleWarehouseAdd,handleWarehouseUpdate,RHFAddWarehouse,RHFUpdateWarehouse,
        handleOtherInventoryAdd,handleOtherInventoryUpdate,RHFAddOtherInventory,RHFUpdateOtherInventory,
        handleEquipmentAdd,handleEquipmentUpdate,RHFAddEquipment,RHFUpdateEquipment,
        handleMedicalInventoryAdd,handleMedicalInventoryUpdate,RHFAddMedicalInventory,RHFUpdateMedicalInventory,
        handleChemicalInventoryAdd,handleChemicalInventoryUpdate,RHFAddChemicalInventory,RHFUpdateChemicalInventory,
    }