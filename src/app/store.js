import { configureStore } from '@reduxjs/toolkit'
import EmployeeReducer from '../Features/Employees/EmployeeSlice'
import FarmReducer from '../Features/Farm/FarmSlice'
export const store = configureStore({
  reducer: {
    employee: EmployeeReducer,
    farm: FarmReducer,

  },
})