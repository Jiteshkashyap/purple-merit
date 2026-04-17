 User Management System (MERN Stack)

A full-stack User Management System built using the MERN stack with secure authentication, role-based authorization (RBAC), and complete user lifecycle management.

Features
Authentication & Security
JWT-based authentication
Secure password hashing using bcrypt
Protected API routes
Role-based access control (RBAC)
Environment-based configuration
User Roles

Admin

Create, update, delete users
Assign roles (Admin / Manager / User)
View all users (paginated + searchable)
Activate/Deactivate users

Manager

View all users
Update non-admin users

User

View own profile
Update name & password

📋 User Management

Create users
Edit user details
Soft delete (deactivate users)
Search & filter users
Pagination

🧾 Audit System

createdAt, updatedAt
createdBy, updatedBy

🏗 Tech Stack

Frontend:
React
Redux
Axios
React Router

Backend:
Node.js
Express.js
MongoDB (Mongoose)

Auth:
JWT
bcrypt

📁 Project Structure
backend
├── controllers
├── routes
├── models
├── middleware
├── services
└── config

frontend
├── components
├── pages
├── context / redux
└── utils


⚙️ Environment Variables

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


🛠 Installation & Setup

Clone repo
git clone https://github.com/Jiteshkashyap/purple-merit
cd user-management-system

Backend

cd backend
npm install
npm run dev

Frontend

cd frontend
npm install
npm start


🌐 Deployment

Frontend: https://purple-merit-psi.vercel.app
Backend: https://purple-merit-xr2k.onrender.com

🔑 API

POST   /api/auth/login
GET    /api/users
POST   /api/users
PUT    /api/users/:id
PATCH /api/users/:id
GET    /api/users/me

👨‍💻 Author
Jitesh Kashyap
