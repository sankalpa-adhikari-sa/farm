import React, { useState } from 'react'
import EmployeeTable from './EmployeeTable';
import { useDispatch,useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { PlusCircle,TableProperties } from 'lucide-react';
import { Button } from "@/components/ui/button"

function Employees() {
  const dispatch= useDispatch()
  const employee = useSelector(state => state.employee.Basic_Info);
  const employee_count = useSelector(state => state.employee.Employee_Count);
  const navigate= useNavigate()
  return (
    <div >
      <div className='flex justify-between'>
        <Button className="font-bold" variant="outline" onClick={()=>{navigate("/employees/list")}} >
          <TableProperties className='w-4 h-4 mr-3'/>
          Employee
        </Button>
        <Button variant="default" onClick={()=>{navigate("/employees/add")}} >
        <PlusCircle className='w-4 h-4 mr-3' />
            Add
        </Button>

       
      </div>

      <Outlet />
        
    </div>
  )
}

export default Employees