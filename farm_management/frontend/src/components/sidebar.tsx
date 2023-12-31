import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GiCow } from "react-icons/gi";

import { Users, Home, ShoppingBasket, Warehouse, ListTodo } from "lucide-react";
import { useAtom } from "jotai";
import { sidebarAtom } from "@/Features/atoms";
function Sidebar() {
  const [SidebarOpen] = useAtom(sidebarAtom);
  return (
    <aside
      className={`bg-background h-screen w-44 ${
        SidebarOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-col space-y-2 my-2 mx-2">
        <NavLink to="/">
          {({ isActive }) => (
            <Button
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          )}
        </NavLink>
        <NavLink to="/employees">
          {({ isActive }) => (
            <Button
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Users className="w-4 h-4 mr-2" />
              Employees
            </Button>
          )}
        </NavLink>
        <NavLink to="/livestock">
          {({ isActive }) => (
            <Button
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <GiCow size={18} className="mr-2" />
              Livestock
            </Button>
          )}
        </NavLink>
        <NavLink to="/inventory">
          {({ isActive }) => (
            <Button
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <ShoppingBasket className="w-4 h-4 mr-2" />
              Inventory
            </Button>
          )}
        </NavLink>
        <NavLink to="/warehouse">
          {({ isActive }) => (
            <Button
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Warehouse className="w-4 h-4 mr-2" />
              Warehouse
            </Button>
          )}
        </NavLink>
        <NavLink to="/tasks">
          {({ isActive }) => (
            <Button
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <ListTodo className="w-4 h-4 mr-2" />
              Tasks
            </Button>
          )}
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
