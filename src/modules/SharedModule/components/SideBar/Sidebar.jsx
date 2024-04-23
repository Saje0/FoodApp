import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      Sidebar
      <button onClick={logout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
