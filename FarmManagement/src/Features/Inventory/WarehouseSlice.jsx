import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Warehouse : [],
    WarehouseCount:0
}
const warehouseSlice= createSlice({
    name:"warehouse",
    initialState,
    reducers: {
        addWarehouse:(state,action) => {
            state.Warehouse.push(action.payload)
            state.WarehouseCount++
        },
        deleteWarehouse:(state,action) => {
            const warehouseId= action.payload;
            state.Warehouse= state.Warehouse.filter(item=> item.id != warehouseId)
            state.WarehouseCount--
        },
        updateWarehouse: (state, action) => {
            const updatedWarehouse = action.payload;
            state.Warehouse = state.Warehouse.map(item =>
                item.id === updatedWarehouse.id ? updatedWarehouse : item
      );
    }
    }
})

export const {addWarehouse, deleteWarehouse,updateWarehouse} = warehouseSlice.actions;
export default warehouseSlice.reducer