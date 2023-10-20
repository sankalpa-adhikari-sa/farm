import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Basic_Info : [],
    Employee_Count:0
}
const employeeSlice= createSlice({
    name:"employee",
    initialState,
    reducers: {
        addEmployee:(state,action) => {
            state.Basic_Info.push(action.payload)
            state.Employee_Count++
        },
        deleteEmployee:(state,action) => {
            const employeeId= action.payload;
            state.Basic_Info= state.Basic_Info.filter(item=> item.id != employeeId)
            state.Employee_Count--
        },
        updateEmployee: (state, action) => {
            const updatedEmployee = action.payload;
            state.Basic_Info = state.Basic_Info.map(item =>
                item.id === updatedEmployee.id ? updatedEmployee : item
      );
    }
    }
})

export const {addEmployee, deleteEmployee,updateEmployee} = employeeSlice.actions;
export default employeeSlice.reducer