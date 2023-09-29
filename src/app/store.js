import { configureStore } from '@reduxjs/toolkit'
import EmployeeReducer from '../Features/Employees/EmployeeSlice'
import FarmReducer from '../Features/Farm/FarmSlice'
import LivestockReducer from '../Features/Livestock/LivestockSlice'
export const store = configureStore({
  reducer: {
    employee: EmployeeReducer,
    farm: FarmReducer,
    livestock:LivestockReducer

  },
})