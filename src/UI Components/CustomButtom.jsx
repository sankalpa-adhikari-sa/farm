import React from 'react'
import { Button } from '@mui/material'
import styled from '@emotion/styled'

const ModeStyle = (theme, onLightMode, onDarkMode) =>
  theme.palette.mode === 'light' ? onLightMode : onDarkMode;

const BaseButton= styled(Button) (()=>({
    
}))
const RouterBtn= styled(BaseButton) (({theme})=>({
    borderRadius:theme.spacing(1),
    backgroundColor: ModeStyle(theme,"black","white"),
    fontSize: theme.spacing(3),
    justifyContent:"left",
    gap:theme.spacing(2),
    fontWeight:600,
    textTransform:"capitalize",

    '&:hover':{
        backgroundColor: ModeStyle(theme,"black","white"),
        boxShadow:"none"

    }
    

}))

export  {BaseButton, RouterBtn}