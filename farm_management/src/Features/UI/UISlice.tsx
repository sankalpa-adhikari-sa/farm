import { createSlice } from '@reduxjs/toolkit'
type SidebarState = "true" | "false"
const initialState = {
    SidebarOpen:(JSON.parse(localStorage.getItem("SidebarOpen") as SidebarState))||false,
    SidebarWidth:180
}


const uiSlice= createSlice({
    name:"ui",
    initialState,
    reducers: {
        toggleSidebar:(state) => {
            state.SidebarOpen= !state.SidebarOpen
            localStorage.setItem("SidebarOpen",state.SidebarOpen) 
        },
    }
})

export const {toggleSidebar} = uiSlice.actions;
export default uiSlice.reducer