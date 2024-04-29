import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import toggler from "../../../../assets/images/3.png";
import { useState } from "react";
function SideBar() {
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
    <div className="sidebar-container">
<Sidebar collapsed={isCollapse}>
      <Menu>
        <MenuItem onClick={toggleCollapse} icon={<img src={toggler} alt="" />} ></MenuItem>
        <MenuItem icon={<i className="fa fa-home"></i>} component={<Link to="/dashboard" />} > Home </MenuItem>
        <MenuItem icon={<i class="fa-solid fa-user-group"></i>} component={<Link to="/dashboard/users" />} > Users </MenuItem>
        <MenuItem icon={<i class="fa-solid fa-list"></i>} component={<Link to="/dashboard/recipes" />} > Recipes </MenuItem>
        <MenuItem icon={<i class="fa-regular fa-calendar-days"></i>} component={<Link to="/dashboard/categories" />} > Categories </MenuItem>
        <MenuItem icon={<i class="fa-solid fa-lock-open"></i>} component={<Link to="/dashboard/changepassword" />} > Change Password </MenuItem>
        <MenuItem icon={<i class="fa-solid fa-right-from-bracket"></i>} component={<Link to="/dashboard/login" />} > Log out </MenuItem>
      </Menu>
    </Sidebar>
    </div>
    
  );
}

export default SideBar;
