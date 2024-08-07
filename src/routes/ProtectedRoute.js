import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  if (
    !adminOnly &&
    user.role === "admin" &&
    !location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/admin/admindashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;