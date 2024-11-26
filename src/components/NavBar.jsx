import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/flowaccess.png";

const NavBar = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();

  //check if user is logged in or not
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    setLoggedIn(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/login");
    toast.success("Logout Successfull");
    setLoggedIn(false);
  };

  return (
    <div>
      {/* Navigation Menu */}
      <nav className="p-4 bg-gray-800 text-white flex justify-between">
        <img src={logo} alt="FlowAccess" />

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
        <div className="  ">
          {isLoggedIn ? (
            <Link
              onClick={handleLogout}
              to="/login"
              className=" bg-red-700 mx-2 py-2 px-4 rounded"
              style={{
                textDecoration: "none",
                fontSize: "14px",
                color: "white",
                width: "110px",
              }}
            >
              Log Out
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="login-btn bg-white mx-2 py-2 px-3 border rounded font-medium no-underline text-black"
              >
                LogIn
              </Link>
              <Link
                to="/register"
                className="signup-btn bg-blue-800 ml-1 py-2 px-3 border rounded font-medium no-underline text-white"
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
