/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { createUser, deleteUserId, getUsers, updateUser } from "./mockApi";
import UserModal from "./components/UserModal";

const UserManagement = () => {
  // State for users and roles
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      // Mock API call
      const data = await getUsers();
      //console.log(data);
      setUsers(data || []);
    };

    fetchUsers();
  }, []);

  const [roles] = useState(["Admin", "Project Manager", "Viewer"]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User"); // Default role

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = { name, email, role, status: "Active" };
    console.log(newUser);

    // Post the new user data to the mock API
    try {
      const data = await createUser(newUser);

      console.log(data);

      if (data && data.id) {
        setUsers(data); // Pass new user data back to the parent
        alert("User added successfully");
        window.location.reload();
      } else {
        alert("Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error adding user");
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const saveUser = async (user) => {
    if (editUser) {
      // Mock API call for updating user
      updateUser(editUser.id, user);
    } else {
      // Mock API call for adding user
      createUser(user);
    }

    setShowModal(false);
    setEditUser(null);
  };

  const handleDeleteUser = (id) => {
    deleteUserId(id);
    setUsers((prev) => prev.filter((user) => user.id !== id));
    alert(`Data deleted successfully`);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const updatedStatus = currentStatus === "Active" ? "Inactive" : "Active"; // Toggle the status
    try {
      // Prepare the updated user object
      const updatedUser = {
        status: updatedStatus,
      };

      // Call the API to update the user
      const response = await updateUser(id, updatedUser);
      //console.log(users, id);

      // Success feedback
      //   console.log("User status updated successfully:", response);
      alert(`Status updated to ${updatedStatus}`);
      window.location.reload();
    } catch (error) {
      // Error feedback
      console.error("Error while toggling status:", error);
      alert("An error occurred while updating the user status.");
    }
  };

  //   console.log(users);
  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* Form for Adding/Editing Users */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Add User</h3>
        <div>
          <form className="flex space-x-4 mt-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border rounded-lg"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded-lg"
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="p-2 border rounded-lg"
              required
            >
              <option className=" text-slate-500" value="">
                User Role
              </option>
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Add
            </button>
          </form>
        </div>
      </div>

      {/* User List */}
      <h2 className="text-xl font-bold mb-4">Users Table</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2 text-center">
                <button
                  onClick={() => handleToggleStatus(user.id, user.status)}
                  className={`px-2 py-1 rounded-lg w-[75px] ${
                    user.status === "Active"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {user.status === "Active" ? "Active" : "Inactive"}
                </button>
              </td>
              <td className="border border-gray-300 p-2 space-x-2 text-center">
                <button
                  onClick={() => {
                    setEditUser(user);
                    setShowModal(true);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <UserModal
          user={editUser}
          onClose={() => setShowModal(false)}
          onSave={saveUser}
        />
      )}
    </div>
  );
};

export default UserManagement;
