import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { userInfo } = useSelector((state) => state.user);

  return userInfo ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
