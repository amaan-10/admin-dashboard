import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://6741af83e4647499008e74a7.mockapi.io/api/v1";
const RoleManagement = () => {
  const [users, setUsers] = useState([]); // List of users
  const [roles, setRoles] = useState([]); // List of roles
  const [editUserId, setEditUserId] = useState(null); // User currently being edited
  const [newRole, setNewRole] = useState(""); // Temporary role for editing

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user`);
      setUsers(response.data); // Assuming the API returns an array of users
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch all users
  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/roles`);
      setRoles(response.data); // Assuming the API returns an array of users
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Update the role of a user
  const updateRole = async (userId, updatedRole) => {
    try {
      await axios.put(`${BASE_URL}/user/${userId}`, { role: updatedRole });
      alert("Role updated successfully!");
      fetchUsers(); // Refresh the user list after updating
      setEditUserId(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role. Please try again.");
    }
  };

  // Handle Save Role
  const handleSaveRole = (userId) => {
    if (!newRole.trim()) {
      alert("Role cannot be empty.");
      return;
    }
    updateRole(userId, newRole);
    addRole(newRole, roles);
  };

  const addRole = async (newRole, entities) => {
    try {
      // Check if the role already exists in any entity
      const roleExists = entities.some((entity) =>
        entity.role.includes(newRole)
      );

      if (roleExists) {
        return;
      }

      // Create a new entity with a unique ID, role, and permission
      const newEntity = {
        id: (entities.length + 1).toString(), // Simple example for generating unique IDs
        createdAt: new Date().toISOString(),
        role: newRole, // Adding the new role
        permission: [], // Add permissions if needed
      };

      // Send the new entity to the API
      const response = await axios.post(`${BASE_URL}/roles`, newEntity);

      if (response.status === 201) {
        alert(`New entity with role "${newRole}" created successfully!`);
      } else {
        alert("Failed to create a new entity. Please try again.");
      }
    } catch (error) {
      console.error("Error creating the entity:", error);
      alert("An error occurred while creating the entity.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className="p-6 bg-gray-100 ">
      <h1 className="text-2xl font-bold mb-4">Role Management</h1>

      {/* User List */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Users Role Table</h2>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Name</th>
              <th className="border border-gray-200 px-4 py-2">Email</th>
              <th className="border border-gray-200 px-4 py-2">Role</th>
              <th className="border border-gray-200 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-200 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-200 px-4 py-2 w-[200px]">
                  {editUserId === user.id ? (
                    <input
                      type="text"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      placeholder="Enter new role"
                      className="border p-2 rounded w-[150px]"
                    />
                  ) : (
                    user.role || "No Role Assigned"
                  )}
                </td>
                <td className="border border-gray-200 px-4 py-2 w-[250px] text-center">
                  {editUserId === user.id ? (
                    <div>
                      <button
                        onClick={() => handleSaveRole(user.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditUserId(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditUserId(user.id);
                        setNewRole(user.role || ""); // Initialize with the current role
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Edit Role
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleManagement;
