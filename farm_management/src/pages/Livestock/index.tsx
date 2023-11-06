import { Button } from "@/components/ui/button"
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { GiCow } from 'react-icons/gi'
import { PlusCircle,TableProperties, Group } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Livestock() {
  const navigate= useNavigate()
  const DropdownMenuTriggerCSS="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  return (
    <div >
      <div className='flex justify-between'>
        <Button className="font-bold" variant="outline" onClick={()=>{navigate("/livestock/list")}} >
          <TableProperties className='w-4 h-4 mr-3'/>
          Livestock
        </Button>

        <DropdownMenu >
          <DropdownMenuTrigger className={DropdownMenuTriggerCSS}>
            <PlusCircle className='w-4 h-4 mr-3' />
            Add
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 mt-1 mr-3" >
            <DropdownMenuItem  onClick={()=>{navigate("/livestock/type/add")}} className="h-10"> 
              Livestock Type
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem  onClick={()=>{navigate("/livestock/add")}} className="h-10"> 
              <GiCow size={24} className='mr-3' />
              Livestock
            </DropdownMenuItem>
            <DropdownMenuItem className="h-10"> 
              <Group className='mr-3' />
              Groups
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Outlet/>
        
    </div>
  )
}

export default Livestock