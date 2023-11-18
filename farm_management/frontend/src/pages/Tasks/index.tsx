import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { PlusCircle,TableProperties} from 'lucide-react';
import { Outlet } from 'react-router-dom';
function Tasks() {
 
  const navigate= useNavigate()
  return (
    <div>
      <div className='flex justify-between  pb-4'>
        <Button onClick={()=> navigate('/tasks/list')} className="font-bold" variant="outline" >
          <TableProperties className='w-4 h-4 mr-3'/>
          Tasks
        </Button>
        <Button onClick={()=> navigate('/tasks/add')} >
          <PlusCircle    className='w-4 h-4 mr-3'/>
          Add
        </Button>
      </div>
      <Outlet />
    </div>
  )
}


export default Tasks