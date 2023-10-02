import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { ActionBtnBlack,ActionBtn } from '../../UI Components/CustomButtom';
import { BaseButton } from '../../UI Components/CustomButtom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
function LivestockTable() {
  const dispatch= useDispatch()
  const livestock = useSelector(state => state.livestock.Livestock_Info);

  return (
    <div>
      Livestock table
      <ActionBtnBlack color='primary' startIcon={<PersonAddIcon sx={{fontWeight:"600",height:16}}/>}>Livestock list</ActionBtnBlack>
      <ActionBtnBlack color='primary'>Livestock list</ActionBtnBlack>
      <ActionBtn sx={{px:2}}color='success' variant='contained' startIcon={<PersonAddIcon sx={{fontWeight:"600",height:16}}/>}>Livestock list</ActionBtn>
    </div>
  )
}

export default LivestockTable