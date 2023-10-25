import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import LivestockDashboard from './LivestockDashboard'
import ComboboxMulti from '../Others/ComboboxMulti'
import LivestockTypeForm from '../Others/LivestockTypeForm'

function LivestockDetails() {
  const {id}= useParams()
  const navigate= useNavigate();

  return (
    <div className='mt-4'>
    <Tabs defaultValue="details" className='w-full h-full' >
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="task">Task</TabsTrigger>
          </TabsList>
        <TabsContent className="w-full h-full" value="details">
          details
        </TabsContent>
        <TabsContent value="dashboard">
          <LivestockDashboard/>
        </TabsContent>
        <TabsContent value="task">
          <LivestockTypeForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default LivestockDetails