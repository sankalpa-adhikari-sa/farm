import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    darkMode: JSON.parse(localStorage.getItem("darkMode"))||
    false,
    mode:localStorage.getItem("mode")|| "light",
    SidebarOpen:JSON.parse(localStorage.getItem("SidebarOpen"))||
                false,
    SidebarWidth:180
}

const uiSlice= createSlice({
    name:"ui",
    initialState,
    reducers: {
        toggleTheme:(state) => {
            state.darkMode= !state.darkMode
            localStorage.setItem("darkMode",state.darkMode)
            state.mode= state.darkMode? "dark":"light"
            localStorage.setItem("mode",state.mode)
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