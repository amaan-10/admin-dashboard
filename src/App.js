import React from "react";
import UserTable from "./components/UserTable";

const App = () => {
  return (
    <div className=" p-10">
      <h1 className=" text-4xl font-bold pb-5">Admin Dashboard</h1>

      <UserTable />
    </div>
  );
};

export default App;
