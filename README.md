# FlowAccess

FlowAccess is a web-based Role-Based Access Control (RBAC) management platform designed to simplify the management of users, roles, and permissions in an organization. The platform enables secure and efficient access control with features for assigning roles and permissions dynamically.

---

## Features

- **User Management**:
  - View, add, edit, and delete users.
  - Assign roles to users.
  - Manage user status (Active/Inactive).

- **Role Management**:
  - Create, update, and delete roles.
  - Assign permissions to roles dynamically.

- **Permission Matrix**:
  - View and edit the permissions for each role.
  - Append or remove permissions dynamically for any role.

- **RBAC Implementation**:
  - Secure pages and actions based on roles and permissions.
  - Navigation restrictions for unauthorized users.

---

## Technology Stack

- **Frontend**: React.js with Tailwind CSS for styling.
- **Backend**: Node.js and Express.js.
- **Database**: MongoDB.
- **Libraries/Tools**:
  - Axios for API calls.
  - React Router for routing.
  - Toastify for notifications.

---

## Setup Instructions

### Prerequisites
- Node.js and npm installed.
- MongoDB set up locally or using a cloud service like MongoDB Atlas.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/FlowAccess.git
cd FlowAccess
```

2. Install dependencies:

```bash
npm install
```
3. Set up environment variables:

Create a `.env` file in the root directory and add the following:
```bash
REACT_APP_API_BASE_URL=http://localhost:5000/api //I have used mockApi
```
4. Start the development server:

```bash
npm start
```
5. Start the backend server (if not running):

Navigate to the backend directory (if separate) and start the server:
```bash
node server.js
```

### Folder Structure
----------------

`FlowAccess/
├── src/
│   ├── components/         # Reusable components like NavBar, PrivateRoute
│   ├── pages/              # Pages like Dashboard, LoginPage, UserManagement
│   ├── utils/              # Helper functions and API utilities
│   ├── App.js              # Main application component
│   ├── index.js            # Entry point for React
│   ├── styles/             # Tailwind CSS setup and global styles
├── public/                 # Static assets
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
├── README.md               # Project documentation`

* * * * *

### API Endpoints
-------------

#### **Users**

-   `GET /api/users` -- Fetch all users.
-   `PUT /api/users/:id` -- Update a user's role or permissions.
-   `POST /api/users` -- Add a new user.

#### **Roles**

-   `GET /api/roles` -- Fetch unique roles from the users collection.
-   `POST /api/roles` -- Create a new role.

#### **Permissions**

-   `GET /api/permissions` -- Fetch permissions for all roles.
-   `PUT /api/roles/:role/permissions` -- Append new permissions to a role.

* * * * *

### Usage
-----

1.  **Authentication**:

    -   Access `/login` and `/register` for authentication.
    -   Protected routes redirect to login if no token is found in local storage.
2.  **User & Role Management**:

    -   Navigate to **User Management** for managing users and assigning roles.
    -   Go to **Role Management** to define new roles and view existing ones.
3.  **Permissions Management**:

    -   Use the **Permission Matrix** to dynamically assign or remove permissions for roles.
    -   All changes to permissions are immediately reflected for users with the associated role.

* * * * *

### License
-------

This project is licensed under the MIT License.

* * * * *

### Author
------

**Amaan Shaikh**

FlowAccess is a robust and intuitive solution for managing role-based access control efficiently. Contributions and suggestions are welcome!


 `### Updates Based on FlowAccess Features:
- **Roles are derived dynamically** from the users' collection and stored as a unique array.
- The permission matrix is tied to dynamically fetched roles.
- User permissions are stored and managed within the users' collection.

Let me know if further refinements are needed!`