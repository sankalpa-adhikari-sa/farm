import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { PlusCircle,TableProperties } from 'lucide-react';

function Warehouse() {
    const navigate= useNavigate()

    
  return (
    <div >
      <div className='flex justify-between'>
        <Button className="font-bold" variant="outline" onClick={()=>{navigate("/warehouse/list")}} >
          <TableProperties className='w-4 h-4 mr-3'/>
          Warehouse
        </Button>
        <Button className="font-bold"  onClick={()=>{navigate("/warehouse/add/warehouse")}} >
        <PlusCircle className='w-4 h-4 mr-3' />
          Add
        </Button>

       
      </div>

      <Outlet/>
        
    </div>
  )
}

export default Warehouse