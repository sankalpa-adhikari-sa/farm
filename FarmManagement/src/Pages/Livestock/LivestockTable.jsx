import React  from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { Button } from "@/components/ui/button"
import ReusableTable from '../../UI Components/Table';
import { useNavigate } from 'react-router-dom';
import { Pencil,Eye, Trash,PlusSquare,Group } from 'lucide-react';
import { DataTableColumnHeader } from '@/components/ui/table-header';
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import pb from '@/pocketbase/pocketbase'
import { useQuery,useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useDeleteLivestockByID, useLivestock } from '@/hooks/useLivestockData';
function LivestockTable() {
  const dispatch= useDispatch()
  const navigate= useNavigate()
  
  // const queryfuc= async () => {
  //   return await pb.collection('livestock').getFullList({
  //     // to expand multiple collection, expand:"name of field in current collection with relation to another"
  //     // expand:"livestock_type, livestock_yield"
  //     expand:"livestock_type,rel_data",
  //     // to get only selected field
  //     // fields: "livestock_breed, livestock_tag_no, id,expand.livestock_type.type"
  // })}
  // const { data=[],isLoading,isFetched } = useQuery({
  //   queryKey:['livestock'],
  //   queryFn: queryfuc,
  //   staleTime:10000
  // })

  const {data=[]}= useLivestock()



  const deleteLivestockData= useDeleteLivestockByID()
  const handleLivestockDelete= (id) => {
    console.log(id)
    return deleteLivestockData.mutate(id)

  }
  
  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
        id:"Tag No",
        accessorKey: "livestock_tag_no",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tag No" />
        ),

        cell:(props) => 
            <div className='TableData'>{props.getValue()}</div>
    },
    {   id:"Breed",
        // Accessor Key should be same as key of a dictionary
        accessorKey: "livestock_breed",
        //Header is Something you want to show in the header
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Breed" />
        ),
    //     enableSorting: false,
    // enableHiding: false,
        cell:(props) => 
            <div className='TableData'>{props.getValue()}</div>
    },
    {   id:"Livestock Type",
        // Accessor Key should be same as key of a dictionary
        // to get data inside of expand "expand.relationalfield.field inside another collection"
        accessorKey: "expand.livestock_type.type",
        //Header is Something you want to show in the header
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Livestock Type" />
        ),
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
       
                <Button size="icon" onClick={()=>{navigate(`/livestock/${props.row.original.id}`)}}>
                  <Eye/>
                </Button>
                <Button size="icon" onClick={()=>{navigate(`/livestock/${props.row.original.id}/update`)}}>
                  <Pencil/>
                </Button>
                <Button onClick={() => handleLivestockDelete(props.row.original.id)} variant="destructive" size="icon">
                  <Trash />
                </Button>
                </div>
    }
]
// const handleSelection= (table)=>{
//   const sel = table.getSelectedRowModel().flatRows.map(row => row.original.livestock_id)
//   console.log(sel)
  
// }

const DropdownMenuTriggerCSS="w-10 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-2 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

const selectionAction=(table)=>{
  const handleDeleteSelection= ()=>{
    const sel = table.getSelectedRowModel().flatRows.map(row => row.original.livestock_id)
    console.log(sel)
  }
  return ( 
    
  <DropdownMenu>
  <DropdownMenuTrigger className={DropdownMenuTriggerCSS}>
    <PlusSquare className='w-4 h-4' />
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-40" >
    <DropdownMenuLabel>Action</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem  onClick={() => handleDeleteSelection(table)} className="h-10 text-destructive"> 
    <Trash className='w-4 h-4 mr-3 text-destructive' />
      Delete
    </DropdownMenuItem>
    <DropdownMenuItem className="h-10"> 
      <Group className='w-4 h-4 mr-3' />
      Add to Group
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
  )
}
  return (
    <div>
      
      <ReusableTable selection_option={true} 
      selectionAction={selectionAction} 
      columns={columns} 
      filter="Tag No" 
      table_data={data} />
    </div>
  )
}

export default LivestockTable