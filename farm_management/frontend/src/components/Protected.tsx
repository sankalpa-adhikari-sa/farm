import pb from "@/Pocketbase/pocketbase";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./sidebar";
function Protected() {
  const isAuthenticated = pb.authStore.isValid;
  return isAuthenticated ? (
    <>
      <Sidebar />
      <div className="w-full h-full">
        <Navbar />
        <div className="pt-4 pl-4 pr-4 w-full h-full">
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/auth" />
  );
}

export default Protected;
