import React, {useEffect,useState} from 'react'
import {useReactTable, getCoreRowModel, flexRender, getFilteredRowModel} from "@tanstack/react-table"
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { MdSearch} from 'react-icons/md'
import SearchIcon from '@mui/icons-material/Search';
import { BaseButton } from './CustomButtom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { FilledInput, Grid, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
function Table(props) {
    const [current_columns]= useState(()=>[...props.columns])
    const [columnVisibility, setColumnVisibility] = useState({})
    const [columnFilters, setColumnFilters] = useState([
        {
          id: props.filter,
          value: ""
        }
      ]);

      const handleInputChange = (event) => {
        const { value } = event.target;
        setColumnFilters([{ id: props.filter, value }]);
      };
      const table= useReactTable({
        data:props.table_data,
        columns:current_columns,
        state:{
            columnFilters,
            columnVisibility
        },
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel:getCoreRowModel(),
        getFilteredRowModel:getFilteredRowModel(),
    })

   
  return (
    <div>

{props.table_data.length>0 ? 
    <Grid container>
        <Grid justifyContent="space-between" container item>
            <Grid item >
                <TextField InputProps={{
                            endAdornment:
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>,
                            sx:{height:'40px', width:200, fontSize:12}}}
                        value={columnFilters.value}
                        onChange={handleInputChange}
                        placeholder="Search Name..."  
  
                />
            </Grid>
            <Grid item>
                <FormControl fullWidth>
                    <InputLabel sx={{ fontSize:12}}>Show</InputLabel>
                    <Select sx={{width:150}}
                    size='small'
                        multiple
                        value={[]}
                        variant='outlined'
                        fullWidth
                        label="Show">
                        
                      
                        {table.getAllLeafColumns().map(column => {
                            return(
                                <MenuItem key={column.id} onClick={column.getToggleVisibilityHandler()} value={column.id} >
                                <Checkbox {...{
                                                type: "checkbox",
                                                checked: column.getIsVisible(),
                                                onChange: column.getToggleVisibilityHandler()
                                            }} />
                                <ListItemText primary={column.id} />
                                </MenuItem>
                                )
                        })}
            
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
           
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
    </Grid>
    : <div className="NoEmployee">
        No Entries Found,<br/> Add Employees by clicking Add Button above...
    </div>
    }
        

    </div>
  )
}

export default Table