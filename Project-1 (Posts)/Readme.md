# 🚀 Project 1 — Social Media Backend App

This is a full-stack backend learning project built using **Node.js, Express, MongoDB, and EJS**.  
It is a simple social-media style application where users can register, login, upload profile pictures, create posts, like/unlike posts, and edit their posts.

This project was created while learning backend development from YouTube tutorials.

---

## 📌 Features

### 🔐 Authentication
- User registration with hashed passwords (bcrypt)
- Login using JWT (JSON Web Tokens)
- Secure authentication using cookies

### 👤 User Profile
- Upload profile picture using Multer
- View personal profile with all posts
- Logout functionality

### 📝 Posts
- Create new posts
- View all personal posts
- Edit posts
- Like & Unlike posts
- Like counter for each post

---

## 🛠 Tech Stack

- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- EJS  
- JWT  
- bcrypt  
- cookie-parser  
- Multer  
- Tailwind CSS  

---

## ⚙️ Installation & Setup

Initialize the project:

```bash
npm init -y


Install required dependencies:

npm install express mongoose
npm install jsonwebtoken ejs bcrypt cookie-parser
npm install multer

Make sure MongoDB is running on your system.

▶️ Run the Project

Start the server:
node app.js

Open in your browser:

http://localhost:3000

🧠 How It Works
🔑 Authentication

Passwords are encrypted using bcrypt

JWT tokens are created on login and registration

Tokens are stored in cookies

Protected routes use middleware to verify users

🖼 Profile Picture Upload

Handled using Multer

Images are stored in /public/images/uploads

The image filename is saved in the database

❤️ Like System

Each post keeps a list of user IDs who liked it

Clicking Like toggles the user’s ID in the list

🎯 Learning Purpose

This project was built for learning and practicing:

Authentication & authorization

MongoDB relationships

Middleware

File uploads

Backend structure

⚠️ Disclaimer

This project is for learning purposes only and is not production-ready.

📌 Part of Backend Learning Series

This is Project 1 in my backend learning journey.
More projects will be added as I continue improving 🚀
