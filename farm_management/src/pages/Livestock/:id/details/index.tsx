import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LivestockDashboard from './dashboard'
import LivestockTypeForm from "../../forms/LivestockTypeForm"
function LivestockDetails() {

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
          Tasiks
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default LivestockDetails