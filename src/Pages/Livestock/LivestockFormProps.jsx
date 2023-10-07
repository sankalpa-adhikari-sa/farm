import {useForm} from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch,useSelector } from 'react-redux';
import { addLivestock } from '../../Features/Livestock/LivestockSlice';

// const handleLivestockAdd = (data) => {
//     const dispatch= useDispatch()
//     const livestockWithId = {
//       ...data,
//       livestock_id: uuidv4(),
//     };
//     dispatch(addLivestock(livestockWithId));
//     form.reset();
//     form.clearErrors();
  
   
//   };
  


const RHFAddLivestock= ()=>{
    const form = useForm({
        defaultValues:{
            dam_id:null,
      
          }
        })
    return form
}
const RHFUpdateLivestock= ()=>{
    const form = useForm()
    return form
}
const RHFAddLivestockGroup= ()=>{
    const form = useForm()
    return form
}
const RHFUpdateLivestockGroup= ()=>{
    const form = useForm()
    return form
}

export {RHFAddLivestock,RHFUpdateLivestock,
    RHFAddLivestockGroup,RHFUpdateLivestockGroup,
}