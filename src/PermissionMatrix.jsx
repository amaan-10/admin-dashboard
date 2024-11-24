import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://6741af83e4647499008e74a7.mockapi.io/api/v1";

const PermissionMatrix = () => {
  const [roles, setRoles] = useState([]);
  const [permissionsInput, setPermissionsInput] = useState({});
  const [newPermission, setNewPermission] = useState(""); // State for the custom permission input

  // Fetch roles from the API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/roles`);
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  // Handle changes in the permission checkboxes for each role
  const handlePermissionChange = (roleId, permission) => {
    setPermissionsInput((prevInput) => {
      const updatedPermissions = prevInput[roleId] || [];

      if (updatedPermissions.includes(permission)) {
        // If permission is already in the array, remove it
        return {
          ...prevInput,
          [roleId]: updatedPermissions.filter((perm) => perm !== permission),
        };
      } else {
        // If permission is not in the array, add it
        return {
          ...prevInput,
          [roleId]: [...updatedPermissions, permission],
        };
      }
    });
  };

  // Handle the addition of a custom permission
  const handleAddCustomPermission = (roleId) => {
    if (newPermission.trim()) {
      setPermissionsInput((prevInput) => {
        const updatedPermissions = prevInput[roleId] || [];

        // Add the custom permission to the array if it's not already added
        if (!updatedPermissions.includes(newPermission)) {
          return {
            ...prevInput,
            [roleId]: [...updatedPermissions, newPermission],
          };
        }
      });
      setNewPermission(""); // Clear the input field after adding the permission
    }
  };

  // Save the updated permissions for a particular role
  const savePermissions = async (roleId) => {
    const updatedPermissions = permissionsInput[roleId] || [];

    try {
      const response = await axios.put(`${BASE_URL}/roles/${roleId}`, {
        permissions: updatedPermissions,
      });

      if (response.status === 200) {
        alert("Permissions updated successfully!");
      } else {
        alert("Failed to update permissions.");
      }
    } catch (error) {
      console.error("Error updating permissions:", error);
      alert("An error occurred while updating the permissions.");
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl font-bold text-center mb-5">Permission Matrix</h2>
      <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left border-b">Role</th>
            <th className="py-2 px-4 text-left border-b">Permissions</th>
            <th className="py-2 px-4 text-left border-b">
              Add Custom Permission
            </th>
            <th className="py-2 px-4 text-left border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{role.role}</td>
              <td className="py-2 px-4">
                {["Read", "Write", "Update", "Delete"].map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={
                        permissionsInput[role.id]?.includes(permission) ||
                        role.permissions?.includes(permission) ||
                        false
                      }
                      onChange={() =>
                        handlePermissionChange(role.id, permission)
                      }
                      className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                    />
                    <label>{permission}</label>
                  </div>
                ))}
                {/* Display custom permissions */}
                {(permissionsInput[role.id] || []).map(
                  (permission, index) =>
                    !["Read", "Write", "Update", "Delete"].includes(
                      permission
                    ) && (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-sm text-gray-700">
                          {permission}
                        </span>
                      </div>
                    )
                )}
              </td>
              <td className="py-2 px-4">
                {/* Custom permission input */}
                <input
                  type="text"
                  value={newPermission}
                  onChange={(e) => setNewPermission(e.target.value)}
                  placeholder="Enter custom permission"
                  className="p-2 border border-gray-300 rounded-md"
                />
                <button
                  onClick={() => handleAddCustomPermission(role.id)}
                  className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Add
                </button>
              </td>
              <td className="py-2 px-4">
                <button
                  onClick={() => savePermissions(role.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionMatrix;
