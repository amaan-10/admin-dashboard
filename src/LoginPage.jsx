import React, { useState } from "react";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../src/components/InputForm";
import { toast } from "react-toastify";
import { getCredentials } from "./mockApi";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  //const [token, setToken] = useState("");
  const generateToken = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = generateToken(40); // Generate a 10-character random string

    try {
      // Fetch all user data from mockapi.io
      const response = await getCredentials();
      //console.log(response);

      // Find a user with matching email and password
      const user = response.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // Successful login
        setMessage("Login successfull!");
        toast.success("Login Successfully");
        // Save user data or session token
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);
        setRole(user.role);
        navigate("/");
      } else {
        // Login failed
        setMessage("Invalid email or password.");
      }
    } catch (error) {
      // Handle errors (e.g., network issues)
      setMessage("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Sign in  Form */}
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign in</h2>
        <form className="space-y-6" id="login-form" onSubmit={handleSubmit}>
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
          {/* <div className="form-group">
            <input
              type="checkbox"
              name="remember-me"
              id="remember-me"
              className="agree-term"
            />
          </div> */}
          <div className=" text-blue-600 underline text-center">
            <Link to="/register">Create an account</Link>
          </div>
          <div className="form-group form-button">
            <button
              type="submit"
              name="signin"
              id="signin"
              className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              defaultValue="Log in"
            >
              Log In
            </button>
          </div>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
