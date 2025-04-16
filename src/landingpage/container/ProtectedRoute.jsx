import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Protects routes by checking if the user is logged in
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  // If user is not authenticated, redirect to login page
  if (!user || sessionStorage.getItem("isLoggedIn") !== "true") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
