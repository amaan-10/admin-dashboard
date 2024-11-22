import React, { useState } from "react";

const UserTable = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      role: "User",
      status: "Inactive",
    },
  ]);

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <h2>User Management</h2>
      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", textAlign: "left" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
