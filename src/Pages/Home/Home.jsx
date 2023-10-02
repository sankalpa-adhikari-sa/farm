import React from 'react'
import {BaseButton,RouterBtn} from '../../UI Components/CustomButtom'
import { Button } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
function Home() {
  return (
    <div>
      Home
      <BaseButton variant='contained'>
        primary
      </BaseButton>
      <BaseButton color='secondary' variant='contained'>
      secondary
      </BaseButton>

      <BaseButton color='error' variant='contained'>
        wrror
      </BaseButton>
      <BaseButton color='warning' variant='contained'>
        warning
      </BaseButton>
      <BaseButton color='info' variant='contained'>
        info
      </BaseButton>
      <BaseButton color='success' variant='contained'>
        success
      </BaseButton>
      <BaseButton  color='alert' variant='contained'>
        alert
      </BaseButton>
      <RouterBtn sx={{width:"100px"}} variant='contained' startIcon={<HomeIcon/>} >
        Home
      </RouterBtn>
    </div>
  )
}

export default Home