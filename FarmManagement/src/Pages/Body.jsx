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

import {handleResourceAdd,RHFAddResource,
  handleWarehouseAdd,RHFAddWarehouse,
  handleEquipmentAdd,RHFAddEquipment, notify,
} from './FormProps';
import LivestockForm from './Livestock/Form/LivestockForm';
import IndvLivestock from './Livestock/IndvLivestock';
import EmployeeTable from './Employees/EmployeeTable';
import LivestockYield from './Livestock/LivestockYield';
import LivestockYieldForm from './Livestock/Form/LivestockYieldForm';
import LivestockYieldTable from './Livestock/LivestockYieldTable'
import Settings from './Settings/Settings';
import LivestockMeasurement from './Livestock/LivestockMeasurement';
import LivestockMeasurementTable from './Livestock/LivestockMeasurementTable';
import LivestockMeasurementForm from './Livestock/Form/LivestockMeasurementForm';
import LivestockRU from './Livestock/LivestockRU';
import LivestockRUTable from './Livestock/LivestockRUTable';
import LivestockRUForm from './Livestock/Form/LivestockRUForm';
import LivestockTreatment from './Livestock/LivestockTreatment';
import LivestockTreatmentTable from './Livestock/LivestockTreatmentTable';
import LivestockTreatmentForm from './Livestock/Form/LivestockTreatmentForm';


function Body() {
  const sidebarWidth= useSelector(state => state.ui.SidebarWidth)
    const SidebarOpen= useSelector(state => state.ui.SidebarOpen)


  return (
    <div className="pt-4 pl-4 pr-4 w-full h-full" sidebarwidth={sidebarWidth} open={SidebarOpen}>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/employees' element={<Employees/>}>
          <Route index element={<EmployeeTable />} />
          <Route path='list' element ={<EmployeeTable />} />
          <Route path='add' element={<EmployeeAdd 
                                      isUpdate={false}
                                      notify={notify}
                                      submitBtnText="Submit"/>}/>
          <Route path=':id/update' element={<EmployeeUpdate 
                                      isUpdate={true}
                                      notify={notify}
                                      submitBtnText="Update"/>}/>
          <Route path=':id' element={<EmployeeDetails/>}/>
        </Route>
        {/* <Route path='/employees/add' element={<EmployeeAdd/>}/>
        <Route path='/employees/:id' element={<EmployeeDetails/>}/>
        <Route path='/employees/:id/edit' element={<EmployeeUpdate/>}/> */}
        <Route path='/farm' element ={<Farm/>} />
        <Route path='/livestock' element ={<Livestock/>} >
          <Route index element={<LivestockTable />} />
          <Route path='list' element ={<LivestockTable/>} /> 
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
        </Route>
        <Route path="livestock/:id" element={<IndvLivestock />} >
          <Route index element={<LivestockDetails />} />
          <Route path='details' element={<LivestockDetails />} />
          <Route path='yield' element={<LivestockYield />} >
            <Route index element={<LivestockYieldTable />} />
            <Route path='list' element ={<LivestockYieldTable/>} />
            <Route path='add' element ={<LivestockYieldForm
                                        isUpdate={false}
                                        notify={notify}
                                        submitBtnText="Submit"/>} />
            <Route path='update' element ={<LivestockYieldForm
                                        isUpdate={true}
                                        notify={notify}
                                        submitBtnText="Update"/>} />
          </Route>
          <Route path='measurement' element={<LivestockMeasurement />} >
            <Route index element={<LivestockMeasurementTable />} />
            <Route path='list' element ={<LivestockMeasurementTable/>} />
            <Route path='add' element ={<LivestockMeasurementForm
                                        isUpdate={false}
                                        notify={notify}
                                        submitBtnText="Submit"/>} />
            <Route path='update' element ={<LivestockMeasurementForm
                                        isUpdate={true}
                                        notify={notify}
                                        submitBtnText="Update"/>} />
          </Route>
          <Route path='resource_usage' element={<LivestockRU />} >
            <Route index element={<LivestockRUTable />} />
            <Route path='list' element ={<LivestockRUTable/>} />
            <Route path='add' element ={<LivestockRUForm
                                        isUpdate={false}
                                        notify={notify}
                                        submitBtnText="Submit"/>} />
            <Route path='update' element ={<LivestockRUForm
                                        isUpdate={true}
                                        notify={notify}
                                        submitBtnText="Update"/>} />
          </Route>
          <Route path='treatment' element={<LivestockTreatment />} >
            <Route index element={<LivestockTreatmentTable />} />
            <Route path='list' element ={<LivestockTreatmentTable/>} />
            <Route path='add' element ={<LivestockTreatmentForm
                                        isUpdate={false}
                                        notify={notify}
                                        submitBtnText="Submit"/>} />
            <Route path='update' element ={<LivestockTreatmentForm
                                        isUpdate={true}
                                        notify={notify}
                                        submitBtnText="Update"/>} />
          </Route>
        </Route>
        
        <Route path='/inventory' element={<Inventory/>}>
          <Route index element={<InventoryTable/>} />
          <Route path='list' element ={<InventoryTable/>} />
          <Route path='add/resource' element={<ResourceInventoryForm
                                            isUpdate={false}
                                            onSubmit={handleResourceAdd}
                                            form={RHFAddResource}/> }/>
          <Route path='add/warehouse' element={<WarehouseForm
                                             onSubmit={handleWarehouseAdd}
                                             form={RHFAddWarehouse}/>}/>
          <Route path='add/equipment' element={<EquipmentInventoryForm 
                                             onSubmit={handleEquipmentAdd}
                                             form={RHFAddEquipment}/>}/>
        </Route>

        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </div>
  )
}

export default Body