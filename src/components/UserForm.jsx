import React, { useState } from "react";

const UserForm = ({ onUserAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User"); // Default role

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = { name, email, role };
    //console.log(newUser);

    // Post the new user data to the mock API
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      //console.log(data, data.user.id);

      if (data && data.user.id) {
        onUserAdded(data); // Pass new user data back to the parent
        alert("User added successfully");
      } else {
        alert("Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error adding user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border"
          required
        />
      </div>
      <div>
        <label htmlFor="role" className="block">
          Role
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-2 border"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add User
      </button>
    </form>
  );
};

export default UserForm;
