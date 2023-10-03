import React from 'react'
import { Button,IconButton } from '@mui/material'
import styled from '@emotion/styled'

const ModeStyle = (theme, onLightMode, onDarkMode) => {
  return theme.palette.mode === 'light' ? onLightMode : onDarkMode;
}

const BaseButton= styled(Button) (({theme})=>({
  textTransform: "capitalize"
    
}))
const ActionBtn= styled(BaseButton)(({theme}) =>({
  borderRadius:theme.spacing(1),
  fontWeight:600,
  fontSize: theme.spacing(2.5),
  height:theme.spacing(6),
  textTransform:"capitalize",
  paddingTop:"7px",
  
  '.MuiButton-startIcon':{
    marginRight:theme.spacing(1)
  },
  '&:hover':{
    boxShadow:"none"},
}))
const ActionBtnBlack= styled(ActionBtn)(({theme}) =>({
    backgroundColor: ModeStyle(theme,"black","white"),
    color:ModeStyle(theme,"white","black"),

    '&:hover':{
      backgroundColor: ModeStyle(theme,"black","white"),
    },
}))
// const ActionBtnBlack= styled(BaseButton)(({theme}) =>({
//     borderRadius:theme.spacing(1),
//     backgroundColor: ModeStyle(theme,"black","white"),
//     color:ModeStyle(theme,"white","black"),
//     fontWeight:600,
//     fontSize: theme.spacing(2.5),
//     height:theme.spacing(6),
//     textTransform:"capitalize",
//     paddingTop:"7px",

//     '&:hover':{
//       backgroundColor: ModeStyle(theme,"black","white"),
//       boxShadow:"none"},
// }))

const RouterBtn= styled(BaseButton) (({theme})=>({
    borderRadius:theme.spacing(1),
    backgroundColor: ModeStyle(theme,"black","white"),
    color:ModeStyle(theme,"white","black"),
    fontSize: theme.spacing(3),
    justifyContent:"left",
    // gap:theme.spacing(2),
    fontWeight:600,
    textTransform:"capitalize",
    '.NavAct':{
      backgroundColor:"red"
    },
    '&:hover':{
        backgroundColor: ModeStyle(theme,"black","white"),
        boxShadow:"none"

    }
    

}))

export  {BaseButton, RouterBtn,ActionBtn, ActionBtnBlack}