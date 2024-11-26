import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="w-full bg-blue-600 p-4 shadow-md text-white text-center">
        <h1 className="text-3xl font-bold">
          Role-Based Access Control (RBAC) User Interface
        </h1>
      </header>

      <main className="flex flex-col items-center mt-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700">
          Welcome to the Dashboard
        </h2>
        <p className="text-lg text-gray-600">
          Manage users, roles, and permissions seamlessly using the options
          below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {/* User Management */}
          <Link
            to="/user-management"
            className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-blue-600">User Management</h3>
            <p className="mt-2 text-gray-600">
              View and manage all users in the system.
            </p>
          </Link>

          {/* Role Management */}
          <Link
            to="/role-management"
            className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-blue-600">Role Management</h3>
            <p className="mt-2 text-gray-600">
              Define and manage roles across the platform.
            </p>
          </Link>

          {/* Permissions Management */}
          <Link
            to="/permission-management"
            className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-blue-600">
              Permissions Management
            </h3>
            <p className="mt-2 text-gray-600">
              Assign and modify permissions for roles.
            </p>
          </Link>
        </div>
      </main>

      <footer className="w-full bg-gray-800 text-white text-center py-4 mt-8">
        <p className=" text-[14px]">
          &copy; 2024 <span className=" font-bold">FlowAccess</span>. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
