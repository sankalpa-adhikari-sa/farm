import { configureStore } from '@reduxjs/toolkit'
import UIReducer from './Features/UI/UISlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

// import EmployeeReducer from '../Features/Employees/EmployeeSlice'
// import FarmReducer from '../Features/Farm/FarmSlice'
// import LivestockReducer from '../Features/Livestock/LivestockSlice'
export const store = configureStore({
  reducer: {
    ui: UIReducer,
    // employee: EmployeeReducer,
    // farm: FarmReducer,
    // livestock:LivestockReducer

  },
})

export type RootState= ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


