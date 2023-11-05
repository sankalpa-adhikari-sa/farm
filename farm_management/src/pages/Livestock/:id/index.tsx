import { Outlet } from 'react-router-dom'
import { PlusSquare } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useNavigate, useParams } from 'react-router-dom'
import { useLivestockByID } from '../hooks/useLivestockData'
function IndvLivestock() {
  const navigate= useNavigate();
  const {id}= useParams();
  const LivestockDetails_Query= useLivestockByID(id)
const livestock_details= LivestockDetails_Query.data
// const livestock_details= data
  const DropdownMenuTriggerCSS= "text-secondary-foreground border border-input h-10 px-4 py-2 bg-background inline-flex items-center justify-center hover:bg-accent hover:text-accent-foreground border-dashed border-2"
  return (
    <div className='w-full h-full'>
      <Card>
        <CardHeader className="flex flex-row justify-between" >
          <div>
            <CardTitle>{livestock_details?.livestock_tag_no}</CardTitle>
            <CardDescription>
              {livestock_details?.livestock_details}
            </CardDescription>
          </div>
          <div>
            <DropdownMenu className="w-42">
            <DropdownMenuTrigger className={DropdownMenuTriggerCSS}>
              <PlusSquare className='h-4 w-4 mr-2' />
              Options
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-40 mr-2" >
              <DropdownMenuLabel>Manage</DropdownMenuLabel>
              <DropdownMenuSeparator  />
              <DropdownMenuItem onClick={()=> navigate(`/livestock/${id}/resource_usage`)}  className="h-10"> 
                Resource Usage
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=> navigate(`/livestock/${id}/yield`)} className="h-10"> 
                Yield
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=> navigate(`/livestock/${id}/measurement`)} className="h-10"> 
                Measurement
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=> navigate(`/livestock/${id}/treatment`)} className="h-10"> 
                Treatment
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=> navigate(`/livestock/${id}/details`)} className="h-10"> 
                Details
              </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
        </CardHeader>
        <CardContent>
          hi
        </CardContent>
      </Card>
      <Outlet />
    </div>
  )
}

export default IndvLivestock