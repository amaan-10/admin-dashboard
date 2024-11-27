import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage
  const role = localStorage.getItem("role");

  const toastId = "unique-toast";

  // If there's no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  } else if (token && role === "User") {
    if (!toast.isActive(toastId)) {
      toast.info("Users are not allowed !!", { toastId });
    }

    return <Navigate to="/" />;
  }

  // If token exists, render the element (protected route)
  return element;
};

export default PrivateRoute;
