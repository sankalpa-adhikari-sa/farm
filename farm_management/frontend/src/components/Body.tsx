import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Livestock from "@/pages/Livestock";
import LivestockTable from "@/pages/Livestock/LivestockTable";
import LivestockForm from "@/pages/Livestock/forms/LivestockForm";
import IndvLivestock from "@/pages/Livestock/:id";
import LivestockDetails from "@/pages/Livestock/:id/details";
import LivestockYield from "@/pages/Livestock/:id/yield";
import LivestockYieldTable from "@/pages/Livestock/:id/yield/yield_table";
import LivestockYieldForm from "@/pages/Livestock/:id/yield/forms/yieldForm";
import Settings from "@/pages/Settings";
import LivestockMeasurementTable from "@/pages/Livestock/:id/measurement/MeasurementTable";
import LivestockMeasurementForm from "@/pages/Livestock/:id/measurement/forms/measurementForm";
import LivestockMeasurement from "@/pages/Livestock/:id/measurement";
import LivestockRUTable from "@/pages/Livestock/:id/resource_usage/usageTable";
import LivestockRU from "@/pages/Livestock/:id/resource_usage";
import LivestockRUForm from "@/pages/Livestock/:id/resource_usage/forms/ResourceUsageForm";
import Inventory from "../pages/Inventory";
import ResourceForm from "@/pages/Inventory/forms/ResourceForm";
import InventoryTable from "@/pages/Inventory/InventoryTable";
import Warehouse from "@/pages/Warehouse";
import WarehouseForm from "@/pages/Warehouse/forms/WarehouseForm";
import WarehouseTable from "@/pages/Warehouse/WarehouseTable";
import EquipmentForm from "@/pages/Inventory/forms/EquipmentForm";
import LivestockTypeForm from "@/pages/Livestock/forms/LivestockTypeForm";
import Tasks from "@/pages/Tasks";
import TasksList from "@/pages/Tasks/TasksList";
import TasksForm from "@/pages/Tasks/forms/TasksForm";
import Auth from "@/pages/Auth";
import Protected from "./Protected";
import PageNotFound from "@/pages/404";
function Body() {
  return (
    // <div className="pt-4 pl-4 pr-4 w-full h-full">
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route element={<Protected />}>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/livestock" element={<Livestock />}>
          <Route index element={<LivestockTable />} />
          <Route path="list" element={<LivestockTable />} />
          <Route
            path="add"
            element={<LivestockForm isUpdate={false} submitBtnText="Submit" />}
          />
          <Route
            path="type/add"
            element={
              <LivestockTypeForm isUpdate={false} submitBtnText="Submit" />
            }
          />
          <Route
            path=":id/update"
            element={<LivestockForm isUpdate={true} submitBtnText="Update" />}
          />
        </Route>
        <Route path="livestock/:id" element={<IndvLivestock />}>
          <Route index element={<LivestockDetails />} />
          <Route path="details" element={<LivestockDetails />} />
          <Route path="yield" element={<LivestockYield />}>
            <Route index element={<LivestockYieldTable />} />
            <Route path="list" element={<LivestockYieldTable />} />
            <Route
              path="add"
              element={
                <LivestockYieldForm isUpdate={false} submitBtnText="Submit" />
              }
            />
            <Route
              path="update"
              element={
                <LivestockYieldForm isUpdate={true} submitBtnText="Update" />
              }
            />
          </Route>
          <Route path="measurement" element={<LivestockMeasurement />}>
            <Route index element={<LivestockMeasurementTable />} />
            <Route path="list" element={<LivestockMeasurementTable />} />
            <Route
              path="add"
              element={
                <LivestockMeasurementForm
                  isUpdate={false}
                  submitBtnText="Submit"
                />
              }
            />
            <Route
              path="update"
              element={
                <LivestockMeasurementForm
                  isUpdate={true}
                  submitBtnText="Update"
                />
              }
            />
          </Route>
          <Route path="resource_usage" element={<LivestockRU />}>
            <Route index element={<LivestockRUTable />} />
            <Route path="list" element={<LivestockRUTable />} />
            <Route
              path="add"
              element={
                <LivestockRUForm isUpdate={false} submitBtnText="Submit" />
              }
            />
            <Route
              path="update"
              element={
                <LivestockRUForm isUpdate={true} submitBtnText="Update" />
              }
            />
          </Route>
        </Route>
        <Route path="/inventory" element={<Inventory />}>
          <Route index element={<InventoryTable />} />
          <Route path="list" element={<InventoryTable />} />
          <Route
            path="add/resource"
            element={<ResourceForm isUpdate={false} submitBtnText="Submit" />}
          />
          <Route
            path="add/equipment"
            element={<EquipmentForm isUpdate={false} submitBtnText="Submit" />}
          />
        </Route>
        <Route path="/warehouse" element={<Warehouse />}>
          <Route index element={<WarehouseTable />} />
          <Route path="list" element={<WarehouseTable />} />
          <Route
            path="add"
            element={<WarehouseForm isUpdate={false} submitBtnText="Submit" />}
          />
        </Route>
        <Route path="/tasks" element={<Tasks />}>
          <Route index element={<TasksList />} />
          <Route path="list" element={<TasksList />} />
          <Route
            path="add"
            element={<TasksForm isUpdate={false} submitBtnText="Submit" />}
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
    // </div>
  );
}

export default Body;
