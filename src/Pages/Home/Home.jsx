import React from 'react'
import {BaseButton,RouterBtn} from '../../UI Components/CustomButtom'
import { Button } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
function Home() {
  return (
    <div>
      Home
      <BaseButton variant='contained'>
        hi
      </BaseButton>
      <RouterBtn sx={{width:"100px"}} variant='contained' startIcon={<HomeIcon/>} >
        Home
      </RouterBtn>
    </div>
  )
}

export default Home