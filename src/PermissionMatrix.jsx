/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://6741af83e4647499008e74a7.mockapi.io/api/v1";

const RolePermissionManager = () => {
  const [roles, setRoles] = useState([]); // Unique roles
  const [users, setUsers] = useState([]); // All users
  const [permissions, setPermissions] = useState({}); // Role-permission mapping
  const [newPermission, setNewPermission] = useState(""); // Input for new permission
  const [selectedRole, setSelectedRole] = useState(""); // Role currently being edited
  const [proccessing, setProccessing] = useState(""); // Proccessing

  // Fetch users and extract roles
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user`); // Replace with your API endpoint
        const userData = response.data;
        setUsers(userData);

        // Extract unique roles
        const uniqueRoles = [
          ...new Set(userData.map((user) => user.role)),
        ].filter((role) => role); // Remove empty/null roles
        setRoles(uniqueRoles);

        const rolePermissions = {};

        uniqueRoles.forEach((role) => {
          // Fetch permissions for each role based on users
          const roleUsers = userData.filter((user) => user.role === role);
          const rolePerms = roleUsers.reduce((acc, user) => {
            if (user.permissions) {
              user.permissions.forEach((perm) => {
                if (!acc.includes(perm)) {
                  acc.push(perm);
                }
              });
            }
            return acc;
          }, []);
          rolePermissions[role] = rolePerms;
        });

        setPermissions(rolePermissions);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Add a new permission to the selected role
  const addPermission = () => {
    if (!newPermission.trim() || !selectedRole) return;

    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [selectedRole]: prevPermissions[selectedRole]?.includes(newPermission)
        ? prevPermissions[selectedRole] // Ignore if already exists
        : [...prevPermissions[selectedRole], newPermission],
    }));

    setNewPermission(""); // Clear input
  };

  // Toggle a permission for a role
  const togglePermission = (role, permission) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [role]: prevPermissions[role]?.includes(permission)
        ? prevPermissions[role].filter((perm) => perm !== permission) // Remove permission
        : [...prevPermissions[role], permission], // Add permission
    }));
  };

  // console.log(permissions);

  // Save updated permissions to all users with the selected role
  // Helper function to add a delay (in milliseconds)
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const savePermissionsForRole = async () => {
    try {
      const usersWithRole = users.filter((user) => user.role === selectedRole);

      if (usersWithRole.length === 0) {
        alert(`No users found with the role "${selectedRole}".`);
        return;
      }

      for (const [index, user] of usersWithRole.entries()) {
        const currentPermissions = user.permissions || [];

        // Get the new permission that you want to append (from input or checkboxes)
        const newPermissions = permissions[selectedRole] || [];

        // Merge the current permissions with the new permissions, avoiding duplicates
        const updatedPermissions = [
          ...new Set([...currentPermissions, ...newPermissions]),
        ];

        const updatedUser = {
          id: user.id,
          permissions: updatedPermissions,
        };

        try {
          // Add delay before each API request
          setProccessing(`Setting Permissions...`);
          await delay(10); // Delay of 10ms

          const response = await axios.put(
            `${BASE_URL}/user/${user.id}`,
            updatedUser
          );
          console.log(`Response for user ${user.id}:`, response.data);
        } catch (error) {
          console.error("Error updating user:", error.response?.data || error);
          alert(
            `Failed to update user with id ${user.id}: ${
              error.response?.data?.message || error.message
            }`
          );
        }
      }
      alert("Permissions updated successfully!");
      setProccessing("");
    } catch (error) {
      console.error("Error updating permissions:", error);
      alert("An error occurred while updating permissions.");
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Role Permission Manager</h2>
      <div className="space-y-6">
        {/* Role Selection */}
        <div>
          <label htmlFor="role-select" className="block font-medium">
            Select Role:
          </label>
          <select
            id="role-select"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="border rounded-md p-2 w-full"
          >
            <option value="">-- Select a Role --</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Permissions Section */}
        {selectedRole && (
          <div className="p-4 border rounded-md shadow-sm">
            <h3 className="text-lg font-semibold">
              Permissions for {selectedRole}
            </h3>
            <p className="text-sm text-gray-500">
              Current Permissions:{" "}
              {permissions[selectedRole]?.join(", ") || "None"}
            </p>
            <p className="text-sm text-gray-500">{proccessing}</p>

            <div className="mt-4">
              {/* Checkboxes for existing permissions */}
              <div className="flex flex-wrap gap-4">
                {permissions[selectedRole]?.map((permission) => (
                  <label
                    key={permission}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={permissions[selectedRole]?.includes(permission)}
                      onChange={() =>
                        togglePermission(selectedRole, permission)
                      }
                      className="form-checkbox"
                    />
                    <span>{permission}</span>
                  </label>
                ))}
              </div>

              {/* Input to add new permission */}
              <div className="mt-4 flex space-x-2">
                <input
                  type="text"
                  placeholder="Add new permission"
                  value={newPermission}
                  onChange={(e) => setNewPermission(e.target.value)}
                  className="border rounded-md p-2 w-full"
                />
                <button
                  onClick={addPermission}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Permissions Button */}
      {selectedRole && (
        <button
          onClick={savePermissionsForRole}
          className="mt-8 px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
        >
          Save Permissions for {selectedRole}
        </button>
      )}
    </div>
  );
};

export default RolePermissionManager;
