import React, { useState } from 'react'
// import "./EmployeeTable.scss"
import {useReactTable, getCoreRowModel, flexRender, getFilteredRowModel} from "@tanstack/react-table"
import Data from '../../assets/data.json'
import Button from "../../UI Components/Button"
import {MdDelete, MdEdit, MdCircle, MdOpacity, MdVisibility, MdSearch} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { deleteEmployee } from '../../Features/Employees/EmployeeSlice'
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
            cell:(props) => <div className='ActionWrapper'>
                    
                    <Button onClick={() => handleDelete(props.row.original.id)} size="sm" variant="warning" icon={<MdDelete fontSize={16} color='white'/>}/>
                    <Button onClick={()=> {navigate(`/employees/${props.row.original.id}`)}} size="sm"  icon={<MdVisibility fontSize={16} color="white"/>}/>
                    <Button onClick={()=> {navigate(`/employees/${props.row.original.id}/edit`)}} variant="success" size="sm"  icon={<MdEdit fontSize={16} color="white"/>}/>
                  </div>
        }
    ]
    const [data,setData] = useState(Data)
    const [columnFilters, setColumnFilters] = useState([
        {
          id: "name",
          value: ""
        }
      ]);

      const handleInputChange = (event) => {
        const { value } = event.target;
        setColumnFilters([{ id: 'name', value }]);
      };

    
    const table= useReactTable({
        data:employee,
        columns,
        state:{
            columnFilters
        },
        getCoreRowModel:getCoreRowModel(),
        getFilteredRowModel:getFilteredRowModel(),
    })

  return (
    <div>
        {employee.length>0 ? 
        <div>
            <div className="TableSearchWrapper">
                <input className='TableSearch' type="text"
                        value={columnFilters.value}
                        onChange={handleInputChange}
                        placeholder="Search Name..." 
                        
                /><MdSearch className='Icon' />

            </div>
        <table className="Table">
        <thead className='THead'>
            {table.getHeaderGroups().map(headerGroup => 
                <tr className="TableHeaderRow" key={headerGroup.id}>
                    {headerGroup.headers.map(header => 
                        <th className="TableHeader" key={header.id}>
                            {header.column.columnDef.header}
                        </th> )
                    }
                </tr>)
            }
        </thead>
        <tbody className='TBody'>
            {table.getRowModel().rows.map(row => 
                <tr className="TableRow" key={row.id}>
                    {row.getVisibleCells().map(cell => 
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell,cell.getContext())}
                        </td> )
                    }
                </tr>)
            }
        </tbody>

    </table>
    </div>
    : <div className="NoEmployee">
        No Entries Found,<br/> Add Employees by clicking Add Button above...
    </div>
    }
        
    </div>
  )
}

export default EmployeeTable