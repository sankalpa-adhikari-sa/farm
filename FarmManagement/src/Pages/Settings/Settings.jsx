import React from 'react'
import SettingsSidebar from './SettingsSidebar'
import { Outlet } from 'react-router-dom'
function Settings() {
  return (
    <div className='flex flex-row'>
      <SettingsSidebar/>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Settings