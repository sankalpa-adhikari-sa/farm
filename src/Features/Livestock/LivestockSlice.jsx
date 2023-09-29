import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Livestock_Info : [],
    Livestock_Count:0
}
const livestockSlice= createSlice({
    name:"livestock",
    initialState,
    reducers: {
        addLivestock:(state,action) => {
            state.Livestock_Info.push(action.payload)
            state.Livestock_Count++
        },
        deleteLivestock:(state,action) => {
            const livestockId= action.payload;
            state.Livestock_Info= state.Livestock_Info.filter(item=> item.livestock_id != livestockId)
            state.Livestock_Count--
        },
        updateLivestock: (state, action) => {
            const updatedLivestock = action.payload;
            state.Livestock_Info = state.Livestock_Info.map(item =>
                item.livestock_id === updatedLivestock.livestock_id ? updatedCattle : item
      );
    }
    }
})

export const {addLivestock, deleteLivestock,updateLivestock} = livestockSlice.actions;
export default livestockSlice.reducer