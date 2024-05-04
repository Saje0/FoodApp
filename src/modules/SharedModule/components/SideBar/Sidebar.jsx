import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import toggler from "../../../../assets/images/3.png";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ChangePass from "../../../AuthenticationModule/components/changepass/ChangePass";
function SideBar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isCollapse, setIsCollpase] = useState(false);

  const toggleCollapse = () => {
    setIsCollpase(!isCollapse);
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="p-0">
          <ChangePass logout={logout} />
        </Modal.Body>
      </Modal>

      <div className="sidebar-container">
        <Sidebar collapsed={isCollapse}>
          <Menu>
            <MenuItem
              onClick={toggleCollapse}
              icon={<img src={toggler} alt="" />}
            ></MenuItem>
            <MenuItem
              icon={<i className="fa fa-home"></i>}
              component={<Link to="/dashboard" />}
            >
              Home
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-user-group"></i>}
              component={<Link to="/dashboard/users" />}
            >
              Users
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-list"></i>}
              component={<Link to="/dashboard/recipes" />}
            >
              Recipes
            </MenuItem>
            <MenuItem
              icon={<i className="fa-regular fa-calendar-days"></i>}
              component={<Link to="/dashboard/categories" />}
            >
              Categories
            </MenuItem>
            <MenuItem
              onClick={handleShow}
              icon={<i className="fa-solid fa-lock-open"></i>}
            >
              Change Password
            </MenuItem>
            <MenuItem
              onClick={logout}
              icon={<i className="fa-solid fa-right-from-bracket"></i>}
            >
              Log out
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}

export default SideBar;
