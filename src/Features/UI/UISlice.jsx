import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    darkMode: false,
    mode:"light",
    SidebarOpen:JSON.parse(localStorage.getItem("SidebarOpen"))||
                false,
    SidebarWidth:180
}
console.log(initialState.SidebarOpen)
console.log(JSON.parse(localStorage.getItem("SidebarOpen")))
const uiSlice= createSlice({
    name:"ui",
    initialState,
    reducers: {
        toggleTheme:(state) => {
            state.darkMode= !state.darkMode
            state.mode= state.darkMode? "dark":"light"
        },
        toggleSidebar:(state) => {
            state.SidebarOpen= !state.SidebarOpen
            localStorage.setItem("SidebarOpen",state.SidebarOpen) 
            // Workflow: state.SidebarOpen= !state.SidebarOpen 
            //already set the state and then localstorage is accessing it
           
        },
    }
})

export const {toggleTheme,toggleSidebar} = uiSlice.actions;
export default uiSlice.reducer