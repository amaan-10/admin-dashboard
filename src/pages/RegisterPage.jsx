/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  faUser,
  faEnvelope,
  faLock,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import axios from "axios";
import { toast } from "react-toastify";
// import { BASE_URL } from "../url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setCredentials } from "../mockApi";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setUserRole] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate Password Match
      if (password !== confirmPassword) {
        setMessage("Passwords do not match.");
        return;
      }

      if (!name || !email || !password || !role) {
        return toast.error("Please Provide all Fields");
      }

      const { data } = await setCredentials({
        createdAt: new Date().toISOString(),
        name,
        email,
        password,
        role,
      });

      // Success Message
      setMessage("Registration successful!");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      toast.success("Register Successfully");
      navigate("/login");
      // console.log(data);
    } catch (error) {
      toast.error("Invalid Form Details, Please try again!");
      // console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

          <form
            className="space-y-6"
            id="register-form"
            onSubmit={handleSubmit}
          >
            <InputForm
              htmlFor="Name"
              icon={faUser}
              type={"text"}
              name="name"
              value={name}
              placeholder={"Enter First Name"}
              handleChange={(e) => setName(e.target.value)}
            />

            <InputForm
              htmlFor="Email"
              icon={faEnvelope}
              type={"email"}
              name="email"
              value={email}
              placeholder={"Enter Email"}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <InputForm
              htmlFor="Password"
              icon={faLock}
              type={"password"}
              name="password"
              value={password}
              placeholder={"Enter Password"}
              handleChange={(e) => setPassword(e.target.value)}
              autocomplete="off"
            />
            <InputForm
              htmlFor="Confirm Password"
              icon={faLock}
              type={"password"}
              name="confirmPassword"
              value={confirmPassword}
              placeholder={"Confirm your password"}
              handleChange={(e) => setConfirmPassword(e.target.value)}
              autocomplete="off"
            />

            <div>
              <div className="block text-sm font-medium text-gray-700 pb-1">
                <FontAwesomeIcon className=" pt-2 pe-2" icon={faUserCheck} />
                User Role
              </div>
              <select
                value={role}
                onChange={(e) => setUserRole(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Choose User Role Type
                </option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <div className=" text-blue-600 underline text-center">
              <Link to="/login">I am already a member</Link>
            </div>
            <div className="form-group form-button">
              <button
                type="submit"
                name="signup"
                id="signup"
                className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                placeholder="Sign Up"
              >
                Register
              </button>
            </div>
          </form>
          {message && (
            <p
              className={`mt-4 text-center text-sm ${
                message.includes("successful")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
