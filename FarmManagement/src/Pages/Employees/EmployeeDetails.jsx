import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
function EmployeeDetails() {
    let {id}= useParams()
    const employee = useSelector(state => state.employee.Basic_Info).find((item) => item.id === id);

  return (
    <div>
        <div className="EmployeeName">
            {employee.name}
        </div>
        <div className="EmployeePosition">
            {employee.position}
        </div>
        
    </div>
  )
}

export default EmployeeDetails