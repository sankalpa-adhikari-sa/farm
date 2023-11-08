import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';
import { Pencil,Eye, Trash,MoreHorizontal } from 'lucide-react';

type TableRowProps = {
    deletefn?:() => void,
    view?: string,
    edit?:string

}
function TableRowActions(props:TableRowProps) {
    const navigate= useNavigate()
  return (
    <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
              <MoreHorizontal className='w-4 h-4'/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-30">
              <DropdownMenuLabel>Action</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {props.deletefn?
               <DropdownMenuItem className="h-10 text-destructive" onClick={props.deletefn} >
               <Trash className='w-4 h-4 mr-3 text-destructive' />
               Delete
             </DropdownMenuItem>
              : null}
              {props.view? 
              <DropdownMenuItem className="h-10 " onClick={()=>{navigate(props.view!)}} >
              <Eye className='w-4 h-4 mr-3 ' />
              View
            </DropdownMenuItem>
              
              : null}
              {props.edit? 
              <DropdownMenuItem className="h-10 " onClick={()=>{navigate(props.edit!)}} >
              <Pencil className='w-4 h-4 mr-3 ' />
              Edit
            </DropdownMenuItem>
              
              : null}
             
            </DropdownMenuContent>
          </DropdownMenu>
                </div>
  )
}

export default TableRowActions