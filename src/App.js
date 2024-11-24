import React from "react";
import UserTable from "./components/UserTable";
import RoleManagement from "./RoleManagement";
import UserManagement from "./UserManagement";
import PermissionMatrix from "./PermissionMatrix";

const App = () => {
  return (
    <div className=" p-10">
      <h1 className=" text-4xl font-bold pb-5">Admin Dashboard</h1>
      {/* <UserTable /> */}
      <RoleManagement />
      <UserManagement />
      <PermissionMatrix />
    </div>
  );
};

export default App;
