import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../SideBar/Sidebar";

function MasterLayOut({ loginData }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div>
            <Sidebar />
          </div>
        </div>
        <div className="col-md-9">
          <div>
            <Navbar loginData={loginData} />
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MasterLayOut;
