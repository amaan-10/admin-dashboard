import React, { useState } from "react";

const DynamicPermissions = () => {
  // State for roles and permissions
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Viewer", permissions: ["Read"] },
  ]);

  const [permissionsList, setPermissionsList] = useState([
    { id: 1, name: "Read" },
    { id: 2, name: "Write" },
    { id: 3, name: "Delete" },
    { id: 4, name: "Update" },
  ]);

  const [selectedRole, setSelectedRole] = useState(null);

  // Handlers
  const handleSelectRole = (role) => {
    setSelectedRole(role);
  };

  const togglePermission = (permission) => {
    if (!selectedRole) return;

    const updatedPermissions = selectedRole.permissions.includes(permission)
      ? selectedRole.permissions.filter((perm) => perm !== permission)
      : [...selectedRole.permissions, permission];

    setRoles((prev) =>
      prev.map((role) =>
        role.id === selectedRole.id
          ? { ...role, permissions: updatedPermissions }
          : role
      )
    );

    setSelectedRole({ ...selectedRole, permissions: updatedPermissions });
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Dynamic Permissions</h2>

      {/* Role Selection */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Roles</h3>
        <ul className="list-disc ml-6">
          {roles.map((role) => (
            <li
              key={role.id}
              onClick={() => handleSelectRole(role)}
              className={`cursor-pointer ${
                selectedRole?.id === role.id ? "font-bold text-blue-500" : ""
              }`}
            >
              {role.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Permissions Management */}
      {selectedRole && (
        <div>
          <h3 className="text-lg font-semibold">
            Manage Permissions for "{selectedRole.name}"
          </h3>
          <div className="mt-4">
            <h4 className="font-semibold">Available Permissions:</h4>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {permissionsList.map((permission) => (
                <label
                  key={permission.id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedRole.permissions.includes(permission.name)}
                    onChange={() => togglePermission(permission.name)}
                  />
                  <span>{permission.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Display Current Permissions */}
          <div className="mt-6">
            <h4 className="font-semibold">Current Permissions:</h4>
            <p>
              {selectedRole.permissions.length
                ? selectedRole.permissions.join(", ")
                : "No permissions assigned."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicPermissions;
