import React, { useState, useEffect } from "react";

const UserModal = ({ user, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const handleSubmit = () => {
    onSave({ name, email, role });
    alert("Data Updated successfully");
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h3 className="text-lg font-bold mb-4">
          {user ? "Edit User" : "Add User"}
        </h3>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full mb-2 p-2 border"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full mb-2 p-2 border"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block w-full mb-2 p-2 border"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UserModal;
