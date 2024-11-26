import React from "react";
import RoleManagement from "./RoleManagement";
import UserManagement from "./UserManagement";
import PermissionMatrix from "./PermissionMatrix";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import { ToastContainer } from "react-toastify";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import "@fortawesome/fontawesome-free/css/all.css";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <>
      <ToastContainer />
      <div>
        {/* Define Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <Dashboard />
              </>
            }
          />
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
            path="/user-management"
            element={
              <>
                <NavBar />
                <UserManagement />
              </>
            }
          />
          <Route
            path="/role-management"
            element={
              <>
                <NavBar />
                <RoleManagement />
              </>
            }
          />
          <Route
            path="/permission-management"
            element={
              <>
                <NavBar />
                <PermissionMatrix />
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
