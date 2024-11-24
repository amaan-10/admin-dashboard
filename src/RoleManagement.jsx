import React, { useState } from "react";

const RoleManagement = () => {
  // State for roles and permissions
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      permissions: { Read: true, Write: true, Delete: true },
    },
    {
      id: 2,
      name: "Viewer",
      permissions: { Read: true, Write: false, Delete: false },
    },
  ]);

  const [permissionsList] = useState(["Read", "Write", "Delete"]);
  const [formRole, setFormRole] = useState({
    id: 0,
    name: "",
    permissions: { Read: false, Write: false, Delete: false },
  });

  const [isEditMode, setIsEditMode] = useState(false);

  // Handlers
  const handleAddOrEditRole = () => {
    if (isEditMode) {
      setRoles((prev) =>
        prev.map((role) => (role.id === formRole.id ? formRole : role))
      );
    } else {
      setRoles((prev) => [
        ...prev,
        { ...formRole, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
      ]);
    }
    resetForm();
  };

  const handleEditRole = (role) => {
    setFormRole(role);
    setIsEditMode(true);
  };

  const handleDeleteRole = (id) => {
    setRoles((prev) => prev.filter((role) => role.id !== id));
  };

  const togglePermission = (permission) => {
    setFormRole((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: !prev.permissions[permission],
      },
    }));
  };

  const resetForm = () => {
    setFormRole({
      id: 0,
      name: "",
      permissions: { Read: false, Write: false, Delete: false },
    });
    setIsEditMode(false);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Role Management</h2>

      {/* Form for Adding/Editing Roles */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">
          {isEditMode ? "Edit Role" : "Add Role"}
        </h3>
        <div className="flex flex-col space-y-4 mt-2">
          <input
            type="text"
            placeholder="Role Name"
            value={formRole.name}
            onChange={(e) => setFormRole({ ...formRole, name: e.target.value })}
            className="p-2 border rounded-lg"
          />

          <div>
            <h4 className="font-semibold">Permissions:</h4>
            <div className="flex space-x-4 mt-2">
              {permissionsList.map((permission, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formRole.permissions[permission]}
                    onChange={() => togglePermission(permission)}
                  />
                  <span>{permission}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleAddOrEditRole}
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
      </div>

      {/* Role List */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Role Name</th>
            <th className="border border-gray-300 p-2">Permissions</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="border border-gray-300 p-2">{role.name}</td>
              <td className="border border-gray-300 p-2">
                {permissionsList
                  .filter((perm) => role.permissions[perm])
                  .join(", ")}
              </td>
              <td className="border border-gray-300 p-2 space-x-2">
                <button
                  onClick={() => handleEditRole(role)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRole(role.id)}
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

export default RoleManagement;
