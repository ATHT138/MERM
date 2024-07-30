import Navbar from "./navbar";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Navbar />
      <div className="flex flex-1 w-full h-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
