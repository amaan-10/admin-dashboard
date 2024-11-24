import React, { useState, useEffect } from "react";
import UserModal from "./UserModal";
import UserForm from "./UserForm";
import { getUsers, deleteUserId, updateUser, createUser } from "../mockApi";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      // Mock API call
      const data = await getUsers();
      //console.log(data);
      setUsers(data || []);
    };

    fetchUsers();
  }, []);

  //console.log(users);

  const deleteUser = async (id) => {
    // Mock API call
    deleteUserId(id);
    setUsers(users.filter((user) => user.id !== id));
    alert("Data deleted successfully");
  };

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

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]); // Add the new user to the list
  };

  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <button
        onClick={toggleForm}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {showForm ? "Cancel" : "Add User"}
      </button>
      {showForm && <UserForm onUserAdded={addUser} />}
      {/* Show the form if true */}
      <table className="mt-4 table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
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
                  onClick={() => {
                    setEditUser(user);
                    setShowModal(true);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
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

export default UserTable;
