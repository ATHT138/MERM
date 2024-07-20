import { Outlet } from "react-router-dom";
import SiderBar from "./siderbar";

const DashboardLayout = () => {
  return (
    <div className="flex p-5">
      <SiderBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
