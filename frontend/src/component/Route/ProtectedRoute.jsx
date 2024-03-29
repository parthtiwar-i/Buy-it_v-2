import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    !loading &&
    (isAuthenticated === false ? <Navigate to={"/login"} /> : <Outlet />)
  );
};
export default ProtectedRoute;
