import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// 🔒 PROTECTED ROUTE
export const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation(); // 👈 Captures the current route configuration

  // Save the intended destination URL inside the state property
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

// 🔓 PUBLIC ONLY ROUTE
export const PublicOnlyRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  // Pull the intended destination if it exists, otherwise fall back to /profile
  const redirectPath = location.state?.from?.pathname || "/profile";

  return !isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} replace />;
};
