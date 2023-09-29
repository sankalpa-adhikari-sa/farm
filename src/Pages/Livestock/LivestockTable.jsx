import React from 'react'
import { useDispatch,useSelector } from 'react-redux';

function LivestockTable() {
  const dispatch= useDispatch()
  const livestock = useSelector(state => state.livestock.Livestock_Info);
  console.log(livestock)
  return (
    <div>LivestockTable</div>
  )
}

export default LivestockTable