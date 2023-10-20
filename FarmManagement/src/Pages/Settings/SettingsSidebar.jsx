import { Button } from '@/components/ui/button'
import React from 'react'

function SettingsSidebar() {
  return (
    <div className='w-32 pr-2'>
      <Button variant="ghost">
        Account
      </Button>
      <Button variant="ghost">
        Others
      </Button>
    </div>
  )
}

export default SettingsSidebar