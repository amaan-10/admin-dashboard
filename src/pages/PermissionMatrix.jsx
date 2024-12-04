/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUsers, updateUser } from "../mockApi";

const RolePermissionManager = () => {
  const [roles, setRoles] = useState([]); // Unique roles
  const [users, setUsers] = useState([]); // All users
  const [permissions, setPermissions] = useState({}); // Role-permission mapping
  const [newPermission, setNewPermission] = useState(""); // Input for new permission
  const [selectedRole, setSelectedRole] = useState(""); // Role currently being edited
  const [proccessing, setProccessing] = useState(""); // Proccessing
  const [uniquePermissions, setUniquePermissions] = useState([]); // Unique permissions

  //console.log(uniquePermissions);

  // Fetch users and extract roles
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
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

        const allPermissions = new Set();
        userData.forEach((user) => {
          user.permissions?.forEach((perm) => allPermissions.add(perm));
        });

        setUniquePermissions(Array.from(allPermissions));
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

          updateUser(user.id, updatedUser);

          //console.log(`Response for user ${user.id}:`, response.data);
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

  // Handle permission toggle
  const handlePermissionChange = (userId, permission) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          const updatedPermissions = user.permissions.includes(permission)
            ? user.permissions.filter((perm) => perm !== permission) // Remove permission
            : [...user.permissions, permission]; // Add permission

          return { ...user, permissions: updatedPermissions };
        }
        return user;
      })
    );
  };

  // Save updated user data to API
  const savePermissions = async (userId) => {
    try {
      const user = users.find((u) => u.id === userId);
      updateUser(userId, {
        permissions: user.permissions,
      });
      alert(`Permissions updated for ${userId}`);
    } catch (error) {
      console.error("Error saving permissions:", error);
      alert("Failed to update permissions.");
    }
  };

  return (
    <div className=" bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Role-Permission Manager</h2>
      <div className="space-y-6">
        {/* Role Selection */}
        <div>
          <label htmlFor="role-select" className="block font-medium">
            Set new Permission:
          </label>
          <select
            id="role-select"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="border rounded-md p-2 w-full"
          >
            <option value="" disabled>
              -- Select a Role --
            </option>
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
      {/* User vs Role vs Permissions Table */}
      <div className="container mx-auto mt-8">
        <h2 className="text-xl font-bold mb-4">User Permissions Table</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 w-24">User ID</th>
              <th className="border border-gray-300 px-4 py-2 w-80">Name</th>
              <th className="border border-gray-300 px-4 py-2 w-80">Role</th>

              <th className="border border-gray-300 px-4 py-2 w-80">
                Permissions
              </th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {uniquePermissions.map((perm) => (
                    <div key={perm} className="flex items-center pl-24">
                      <input
                        type="checkbox"
                        checked={user.permissions?.includes(perm)}
                        onChange={() => handlePermissionChange(user.id, perm)}
                      />
                      <span className=" pl-2 pr-4">{perm}</span>
                    </div>
                  ))}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => savePermissions(user.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolePermissionManager;
