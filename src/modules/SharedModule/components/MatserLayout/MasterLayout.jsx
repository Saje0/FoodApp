import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";

function MasterLayOut({ loginData }) {
  return (
    <div className="d-flex">
      <div>
        <SideBar />
      </div>
      <div className="w-100">
        <Navbar loginData={loginData} />
        <Outlet />
      </div>
    </div>
  );
}

export default MasterLayOut;
