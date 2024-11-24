import React from "react";
import RoleManagement from "./RoleManagement";
import UserManagement from "./UserManagement";
import PermissionMatrix from "./PermissionMatrix";
import { Link, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";

const App = () => {
  return (
    <div>
      {/* Navigation Menu */}
      <nav className="p-4 bg-gray-800 text-white">
        <ul className="flex gap-4">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/user-management">User Management</Link>
          </li>
          <li>
            <Link to="/role-management">Role Management</Link>
          </li>
          <li>
            <Link to="/permission-management">Permission Management</Link>
          </li>
        </ul>
      </nav>

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/role-management" element={<RoleManagement />} />
        <Route path="/permission-management" element={<PermissionMatrix />} />
        {/* <UserTable/> */}
      </Routes>
    </div>
  );
};

export default App;
