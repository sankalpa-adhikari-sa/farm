import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { PlusCircle,TableProperties} from 'lucide-react';
import { Outlet } from 'react-router-dom';
function LivestockTreatment() {
  const navigate= useNavigate()
  const {id} = useParams()
  return (
    <div className='p-3 mt-4 h-full w-full rounded-lg border bg-card text-card-foreground shadow-sm'>
    <div className='flex justify-between'>
      <Button onClick={()=> navigate(`/livestock/${id}/treatment/list`)} className="font-bold" variant="outline" >
        <TableProperties className='w-4 h-4 mr-3'/>
        Treatment
      </Button>
      <Button onClick={()=> navigate(`/livestock/${id}/treatment/add`)} >
        <PlusCircle    className='w-4 h-4 mr-3'/>
        Add
      </Button>
    </div>
    <Outlet />
  </div>
  )
}

export default LivestockTreatment