import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    darkMode: false,
    mode:"light",
    SidebarOpen:true,
    SidebarWidth:"150px"
}
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
        },
    }
})

export const {toggleTheme,toggleSidebar} = uiSlice.actions;
export default uiSlice.reducer