import DualAxisLineBar from '@/charts/DualAxisLineBar'
import React from 'react'

function LivestockDashboard() {
  return (
    <div className='flex flex-wrap gap-2'>
      <div className='h-80 w-full p-3 shadow-md'>
        <DualAxisLineBar/>
      </div>
      <div className='h-80 w-full p-3 shadow-md'>
        <DualAxisLineBar/>
      </div>
    </div>
  )
}

export default LivestockDashboard