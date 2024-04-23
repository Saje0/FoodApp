import React, { Children } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ loginData, children }) {
  if (localStorage.getItem("token")) return children;
  else return <Navigate to="/login" />;
}

export default ProtectedRoute;
