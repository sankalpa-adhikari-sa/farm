import React from 'react'
import { useState, useEffect } from 'react'
import "./Snackbar.scss"
export default function Snackbar(props) {

    useEffect(()=>{
        const timeout= setTimeout(() =>{
            props?.onClose()
        },3000)
        return () => clearTimeout(timeout)
    },[props?.onClose])
    const snackbarStyle= {
        backgroundColor: "black",
        justifyContent: "space-between",
        cursor:"pointer",
        borderRadius:"5px",
    }

    if (props?.variant == "warning") snackbarStyle.backgroundColor="red"
    if (props?.variant == "success") snackbarStyle.backgroundColor="green"

  return (
    <div className='SnackBarWrapper' onClick={props?.onClose} style={snackbarStyle}>
         {props.children} {props?.icon}
    </div>
  )
}

