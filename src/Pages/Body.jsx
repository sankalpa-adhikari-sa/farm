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
import InventoryTable from './Inventory/InventoryTable';
import LivestockDetails from './Livestock/LivestockDetails'

import { useDispatch, useSelector } from 'react-redux';

import { styled, useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Inventory from './Inventory/Inventory';
import ResourceInventoryForm from './Inventory/Forms/ResourceInventoryForm';
import WarehouseForm from './Inventory/Forms/WarehouseForm';
import EquipmentInventoryForm from './Inventory/Forms/EquipmentInventoryForm'
import { RHFAddLivestock } from './Livestock/LivestockFormProps';

import {handleResourceAdd,RHFAddResource,
  handleWarehouseAdd,RHFAddWarehouse,
  handleEquipmentAdd,RHFAddEquipment, notify,
} from './FormProps';
import LivestockForm from './Livestock/Form/LivestockForm';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, sidebarwidth }) => ({
    flexGrow: 1,
    boxSizing:"border-box",
    padding: theme.spacing(3),
    marginTop: theme.spacing(12),
    // height: `calc(100vh - ${theme.spacing(15)})`,
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${sidebarwidth -12}px`,
    ...(open && {
      border:"1px solid #e9e9e9",
      // border:"1px solid black",
      borderRadius: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 3,
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
          {/* <Route path='add' element ={<LivestockAdd/>} /> */}
          <Route path='add' element ={<LivestockForm
                                      isUpdate={false}
                                      notify={notify}
                                     
                                      submitBtnText="Submit"/>} 
                                      />
          <Route path=':id/update' element ={<LivestockForm
                                      isUpdate={true}
                                      notify={notify}
                                     
                                      submitBtnText="Update"/>} 
                                      />
          <Route path=":id" element={<LivestockDetails />} />
        </Route>
        <Route path='/inventory' element={<Inventory/>}>
          <Route index element={<InventoryTable/>} />
          <Route path='list' element ={<InventoryTable/>} />
          <Route path='add/resource' element={
                                  <ResourceInventoryForm
                                  isUpdate={false}
                                    onSubmit={handleResourceAdd}
                                    form={RHFAddResource}/>
                                  }/>
          <Route path='add/warehouse' element={<WarehouseForm
                                             onSubmit={handleWarehouseAdd}
                                             form={RHFAddWarehouse}/>}/>
          <Route path='add/equipment' element={<EquipmentInventoryForm 
                                             onSubmit={handleEquipmentAdd}
                                             form={RHFAddEquipment}/>}/>
         
        </Route>

        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </Main>
  )
}

export default Body