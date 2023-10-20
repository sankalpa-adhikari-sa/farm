import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { PlusCircle,TableProperties} from 'lucide-react';
import { Outlet } from 'react-router-dom';
function LivestockYield() {
  const {id}= useParams()
  const navigate= useNavigate()
  return (
    <div className='p-3 mt-4 h-full w-full rounded-lg border bg-card text-card-foreground shadow-sm'>
      <div className='flex justify-between'>
        <Button onClick={()=> navigate(`/livestock/${id}/yield/list`)} className="font-bold" variant="outline" >
          <TableProperties className='w-4 h-4 mr-3'/>
          Yield
        </Button>
        <Button onClick={()=> navigate(`/livestock/${id}/yield/add`)} >
          <PlusCircle    className='w-4 h-4 mr-3'/>
          Add
        </Button>
      </div>
      <Outlet />
    </div>
  )
}

export default LivestockYield