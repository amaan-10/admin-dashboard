import React, { useEffect, useState } from "react";
import { deleteUserId, getUsers, updateUser } from "./mockApi";

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
  const [newUser, setNewUser] = useState(null);

  // Form state for adding/editing a user
  const [formUser, setFormUser] = useState({
    id: 0,
    name: "",
    email: "",
    role: "Viewer",
    status: "Active",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  // Handlers
  const handleAddOrEditUser = () => {
    if (isEditMode) {
      setUsers((prev) =>
        prev.map((user) => (user.id === formUser.id ? formUser : user))
      );
    } else {
      setUsers((prev) => [
        ...prev,
        { ...formUser, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
      ]);
    }
    resetForm();
  };

  const handleEditUser = (user) => {
    setFormUser(user);
    setIsEditMode(true);
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

  const resetForm = () => {
    setFormUser({
      id: 0,
      name: "",
      email: "",
      role: "Viewer",
      status: "Active",
    });
    setIsEditMode(false);
  };

  //   console.log(users);
  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">User Management</h2>

      {/* Form for Adding/Editing Users */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">
          {isEditMode ? "Edit User" : "Add User"}
        </h3>
        <div className="flex space-x-4 mt-2">
          <input
            type="text"
            placeholder="Name"
            value={formUser.name}
            onChange={(e) => setFormUser({ ...formUser, name: e.target.value })}
            className="p-2 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={formUser.email}
            onChange={(e) =>
              setFormUser({ ...formUser, email: e.target.value })
            }
            className="p-2 border rounded-lg"
          />
          <select
            value={formUser.role}
            onChange={(e) => setFormUser({ ...formUser, role: e.target.value })}
            className="p-2 border rounded-lg"
          >
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddOrEditUser}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {isEditMode ? "Update" : "Add"}
          </button>
          {isEditMode && (
            <button
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* User List */}
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
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleToggleStatus(user.id, user.status)}
                  className={`px-2 py-1 rounded-lg ${
                    user.status === "Active"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {user.status === "Active" ? "Active" : "Inactive"}
                </button>
              </td>
              <td className="border border-gray-300 p-2 space-x-2">
                <button
                  onClick={() => handleEditUser(user)}
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
    </div>
  );
};

export default UserManagement;
