import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserSidebarProvider } from "../context/UserSidebarContext";


const UserSidebarLayout = () => {
  const user = localStorage.getItem("token");

  if (!user) {
    return <Navigate to="/userlogin" replace />;
  }

  return (
    <UserSidebarProvider>
      <Outlet />
    </UserSidebarProvider>
  );
};

export default UserSidebarLayout;
