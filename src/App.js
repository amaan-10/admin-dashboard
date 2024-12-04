import React from "react";
import RoleManagement from "./pages/RoleManagement";
import UserManagement from "./pages/UserManagement";
import PermissionMatrix from "./pages/PermissionMatrix";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "@fortawesome/fontawesome-free/css/all.css";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <>
      <ToastContainer />
      <div>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <>
                <NavBar />
                <LoginPage />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <NavBar />
                <RegisterPage />
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                <NavBar />
                <Dashboard />
              </>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/user-management"
            element={
              <PrivateRoute
                element={
                  <>
                    <NavBar />
                    <UserManagement />
                  </>
                }
              />
            }
          />
          <Route
            path="/role-management"
            element={
              <PrivateRoute
                element={
                  <>
                    <NavBar />
                    <RoleManagement />
                  </>
                }
              />
            }
          />
          <Route
            path="/permission-management"
            element={
              <PrivateRoute
                element={
                  <>
                    <NavBar />
                    <PermissionMatrix />
                  </>
                }
              />
            }
          />

          {/* Redirect to login if no other routes match */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
