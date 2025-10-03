# BlogHub
A modern, feature-rich blogging platform built with the MERN stack (MongoDB, Express.js, React, Node.js). Create, share, and engage with blog posts in a beautiful, responsive interface.

## 🌐 Live Demo
Frontend: https://bloghub-1-rloa.onrender.com

Backend API: https://bloghub-backend-fk08.onrender.com

API Documentation: API Endpoints

## ✨ Features
### 🔐 Authentication & Security
User registration and login with JWT authentication
Password hashing with bcrypt
Protected routes and authorization middleware
Persistent login sessions with localStorage
Secure token-based authentication
### 📝 Blog Management
Create - Write and publish blog posts with rich content
Read - Browse all blogs or read individual posts
Update - Edit your own blog posts
Delete - Remove your blogs with confirmation
Cover image support for attractive blog posts
Personal blog dashboard to manage all your content
### 💬 Social Features
Like/Unlike System - Show appreciation for blog posts
Follow/Unfollow Users - Build your network of favorite writers
View Counter - Track blog post popularity
User Profiles - Customizable profiles with avatars and bio
Follower/Following System - See your connections
### 🎨 User Interface & Experience
Modern, professional gradient design
Fully responsive layout (mobile, tablet, desktop)
Smooth animations and transitions
Loading states and error handling
Image preview in blog editor

## 🗂️ Project Structure

bloghub/
├── backend/                    # Backend API
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   ├── blogController.js  # Blog CRUD operations
│   │   └── userController.js  # User profile & social features
│   ├── middleware/
│   │   └── auth.js            # JWT verification middleware
│   ├── models/
│   │   ├── User.js            # User schema (auth, avatar, followers)
│   │   └── Blog.js            # Blog schema (content, likes, views)
│   ├── routes/
│   │   ├── auth.js            # Auth routes
│   │   ├── blogs.js           # Blog routes
│   │   └── users.js           # User routes
│   ├── .env                   # Environment variables (not in git)
│   ├── .gitignore            # Git ignore file
│   ├── server.js             # Express app setup
│   └── package.json          # Backend dependencies
│
├── client/                    # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   ├── BlogCard.jsx
│   │   │   ├── BlogCard.css
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Home.css
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Auth.css
│   │   │   ├── CreateBlog.jsx
│   │   │   ├── EditBlog.jsx
│   │   │   ├── BlogForm.css
│   │   │   ├── BlogDetail.jsx
│   │   │   ├── BlogDetail.css
│   │   │   ├── MyBlogs.jsx
│   │   │   └── MyBlogs.css
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Global auth state
│   │   ├── services/
│   │   │   └── api.js           # Axios API configuration
│   │   ├── App.jsx              # Main app component
│   │   ├── App.css              # Global styles
│   │   ├── index.js             # Entry point
│   │   └── index.css            # Base styles
│   ├── .gitignore
│   └── package.json             # Frontend dependencies
│
├── .gitignore                   # Root gitignore
└── README.md                    # This file

## Built with ❤️ using the MERN Stack
Happy Blogging! 🚀📝
