import React from 'react'
import { Route, Routes} from 'react-router-dom';
import Home from './Home/Home';
import PageNotFound from './404/PageNotFound';
import Employees from './Employees/Employees';
import EmployeeDetails from './Employees/EmployeeDetails';
import EmployeeUpdate from './Employees/EmployeeUpdate';
import Farm from './Farm/Farm';
import Livestock from './Livestock/Livestock'
import EmployeeAdd from './Employees/EmployeeAdd';
import LivestockAdd from './Livestock/LivestockAdd';
import LivestockTable from './Livestock/LivestockTable';
import { useDispatch, useSelector } from 'react-redux';

import { styled, useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, sidebarwidth }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(12),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${sidebarwidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

function Body() {
  const sidebarWidth= useSelector(state => state.ui.SidebarWidth)
    const SidebarOpen= useSelector(state => state.ui.SidebarOpen)


  return (
    <Main sidebarwidth={sidebarWidth} open={SidebarOpen}>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/employees' element={<Employees/>}/>
        <Route path='/employees/add' element={<EmployeeAdd/>}/>
        <Route path='/employees/:id' element={<EmployeeDetails/>}/>
        <Route path='/employees/:id/edit' element={<EmployeeUpdate/>}/>
        <Route path='/farm' element ={<Farm/>} />
        <Route path='/livestock' element ={<Livestock/>} >
          <Route index element={<LivestockTable />} />
          <Route path='list' element ={<LivestockTable/>} />
          <Route path='add' element ={<LivestockAdd/>} />
        </Route>

        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </Main>
  )
}

export default Body