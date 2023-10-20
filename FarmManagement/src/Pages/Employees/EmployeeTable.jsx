import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { Button } from "@/components/ui/button"
import ReusableTable from '../../UI Components/Table';
import { useNavigate } from 'react-router-dom';
import { Mail } from "lucide-react"
import { Pencil,Eye, Trash } from 'lucide-react';
import { deleteEmployee } from '@/Features/Employees/EmployeeSlice';

function EmployeeTable() {
    let navigate= useNavigate()
    const dispatch= useDispatch()
    const employee = useSelector(state => state.employee.Basic_Info);
    const handleDelete =(id) =>{
        dispatch(deleteEmployee(id))
    }
      
          
    const columns = [
        {
            accessorKey: "name",
            header: "Name",
            cell:(props) => 
                <div className='TableData'>{props.getValue()}</div>
        },
        {
            // Accessor Key should be same as key of a dictionary
            accessorKey: "position",
            //Header is Something you want to show in the header
            header: "Position",
            cell:(props) => 
                <div className='TableData'>{props.getValue()}</div>
        },
        {
            // Accessor Key should be same as key of a dictionary
            accessorKey: "id",
            //Header is Something you want to show in the header
            header: "ID",
            cell:(props) => 
                <div className='TableData'>{props.getValue()}</div>
        },

        // {
        //     accessorKey: "Status",
        //     header: "Status",
        //     cell:(props) => 
        //         <div className='TableData'>{props.getValue() == "Work"? <div> <MdCircle fontSize={16} color='green'/> {props.getValue()}</div>:<div> <MdCircle fontSize={16} color='red'/> {props.getValue()} </div> }</div>
        // },
        {
            accessorKey: "Action",
            header: "Action",
            cell:(props) => <div className='flex flex-row gap-4'>
                    
                    <Button onClick={() => handleDelete(props.row.original.id)} size="icon" variant="destructive" ><Trash /></Button>
                    <Button variant="secondary" onClick={()=> {navigate(`/employees/${props.row.original.id}`)}} size="icon" ><Eye/></Button>
                    <Button onClick={()=> {navigate(`/employees/${props.row.original.id}/update`)}}  size="icon"  ><Pencil /></Button>
                  </div>
        }
    ]
  

  return (
    <div>
      Employee table
      <ReusableTable columns={columns} filter="name" table_data={employee} />
    </div>
  )
}

export default EmployeeTable