import React, { useState, useEffect } from "react";
import { getUsers, updateUser } from "../mockApi";

const RoleManagement = () => {
  const [users, setUsers] = useState([]); // List of users
  const [editUserId, setEditUserId] = useState(null); // User currently being edited
  const [newRole, setNewRole] = useState(""); // Temporary role for editing

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      //console.log(data);
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Update the role of a user
  const updateRole = async (userId, updatedRole) => {
    try {
      updateUser(userId, { role: updatedRole });
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
  };

  useEffect(() => {
    fetchUsers();
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
