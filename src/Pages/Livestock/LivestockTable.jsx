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
    </div>
  )
}

export default LivestockTable