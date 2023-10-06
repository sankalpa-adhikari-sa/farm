import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { ActionBtnBlack,ActionBtn } from '../../UI Components/CustomButtom';
import { BaseButton } from '../../UI Components/CustomButtom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Table from '../../UI Components/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LivestockTable() {
  const dispatch= useDispatch()
  const navigate= useNavigate()
  const livestock = useSelector(state => state.livestock.Livestock_Info);
  console.log(livestock)
  const columns = [
    {
        accessorKey: "tag_no",
        header: "Tag Number",
        cell:(props) => 
            <div className='TableData'>{props.getValue()}</div>
    },
    {
        // Accessor Key should be same as key of a dictionary
        accessorKey: "breed",
        //Header is Something you want to show in the header
        header: "Breed",
        cell:(props) => 
            <div className='TableData'>{props.getValue()}</div>
    },
    {
        // Accessor Key should be same as key of a dictionary
        accessorKey: "cattle_type",
        //Header is Something you want to show in the header
        header: "Cattle Type",
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
        cell:(props) => <div>
         { console.log(props)}
                <IconButton onClick={()=>{navigate(`/livestock/${props.row.original.livestock_id}`)}}>
                  <VisibilityIcon/>
                </IconButton>
                <IconButton>
                  <EditIcon/>
                </IconButton>
                <IconButton>
                  <DeleteIcon color='alert'/>
                </IconButton>
                {/* <BaseButton onClick={() => handleDelete(props.row.original.id)} size="sm" variant="warning" icon={<MdDelete fontSize={16} color='white'/>}/>
                <BaseButton onClick={()=> {navigate(`/employees/${props.row.original.id}`)}} size="sm"  icon={<MdVisibility fontSize={16} color="white"/>}/>
                <BaseButton onClick={()=> {navigate(`/employees/${props.row.original.id}/edit`)}} variant="success" size="sm"  icon={<MdEdit fontSize={16} color="white"/>}/> */}
              </div>
    }
]
  return (
    <div>
      Livestock table
      <Table columns={columns} filter="tag_no" table_data={livestock} />
    </div>
  )
}

export default LivestockTable