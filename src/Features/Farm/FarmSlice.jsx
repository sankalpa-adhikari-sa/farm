import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Farm_Info : [],
    Farm_Count:0
}
const farmSlice= createSlice({
    name:"farm",
    initialState,
    reducers: {
        addFarm:(state,action) => {
            state.Farm_Info.push(action.payload)
            state.Farm_Count++
        },
        deleteFarm:(state,action) => {
            const farmId= action.payload;
            state.Farm_Info= state.Farm_Info.filter(item=> item.id != farmId)
            state.Farm_Count--
        },
        updateFarm: (state, action) => {
            const updatedFarm = action.payload;
            state.Farm_Info = state.Farm_Info.map(item =>
                item.id === updatedFarm.id ? updatedFarm : item
      );
    }
    }
})

export const {addFarm, deleteFarm,updateFarm} = farmSlice.actions;
export default farmSlice.reducer