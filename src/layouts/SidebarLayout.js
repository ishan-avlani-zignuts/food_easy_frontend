import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { MyProSidebarProvider } from "../context/SidebarContext";

const SidebarLayout = () => {
  const user = localStorage.getItem("token");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <MyProSidebarProvider>
      <Outlet />
    </MyProSidebarProvider>
  );
};

export default SidebarLayout;
