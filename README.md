# StoryPulse — Full-Stack Blog Platform

StoryPulse is a full-stack blogging and content publishing platform built with **React.js**, **Python Flask**, and **MySQL**. It features JWT authentication, role-based authorization, RESTful CRUD APIs, real-time post discussions, keyword search filtering, and an administrative metrics console.

---

## 📌 Tech Stack

* **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Axios, React Router v6
* **Backend**: Python 3.10+, Flask, Flask-SQLAlchemy, Flask-JWT-Extended, Flask-CORS
* **Database**: MySQL 8.0 (InnoDB engine, UTF8mb4)
* **Authentication**: Stateless JSON Web Tokens (Bearer Token), Password Hashing (Werkzeug Scrypt)
* **Architecture**: Decoupled Client-Server RESTful Architecture

---

## ✨ Features

### 1. Authentication & Security
* User registration and login flows with form validation.
* Secure password hashing via `werkzeug.security` (Scrypt).
* Persistent session tracking across browser reloads using React Context and JWT Bearer tokens.
* Role-based access control separating regular authors from system administrators.

### 2. Content Engine
* Complete CRUD (Create, Read, Update, Delete) operations for articles.
* HTML formatting support for code blocks, lists, and formatted text.
* Automatic reading-time estimation based on word count.
* Unique SEO-friendly slug generation for each article.
* Draft versus Published status toggling.

### 3. Discussions (Comments)
* Threaded comment section underneath every published post.
* Instant comment creation linked to users and posts with foreign-key referential integrity.
* Granular comment deletion controls (restricted to comment owners or administrators).

### 4. Search & Categories
* Keyword query search filtering across blog titles and short descriptions.
* Topic categorization: Technology, Python Programming, and Web Development.

### 5. Administrative Dashboard
* System metrics view tracking registered users, live articles, categories, and total comments.
* Moderation controls for platform content.

---

## 📁 Repository Structure

```text
blog-platform/
├── backend/
│   ├── app/
│   │   ├── config/
│   │   │   └── settings.py       # Flask environment & SQLAlchemy configurations
│   │   ├── middleware/
│   │   │   └── auth.py           # Admin JWT verification decorators
│   │   ├── models/
│   │   │   ├── blog.py           # Post, Category, and Comment ORM models
│   │   │   └── user.py           # User model & password hashing logic
│   │   └── routes/
│   │       ├── admin_routes.py   # Admin metrics and categories API
│   │       ├── auth_routes.py    # Registration, login, and user profile API
│   │       ├── blog_routes.py    # Blog post CRUD and search API
│   │       └── comment_routes.py # Post comments and moderation API
│   ├── app.py                    # Flask server entrypoint
│   ├── requirements.txt          # Python pip dependencies
│   └── .env.example              # Sample environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.jsx        # Multi-column footer with newsletter & badges
│   │   │   └── Navbar.jsx        # Navigation bar with live search & user menu
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global React authentication provider
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx# Administrator statistics console
│   │   │   ├── BlogDetail.jsx    # Full article reader and comment feed
│   │   │   ├── CreateBlog.jsx    # Blog authoring and publishing editor
│   │   │   ├── Home.jsx          # Public feed with article cards & hero banner
│   │   │   ├── Login.jsx         # Sign-in page
│   │   │   ├── Register.jsx      # New account registration page
│   │   │   └── UserDashboard.jsx # Creator workspace to manage authored blogs
│   │   ├── services/
│   │   │   └── api.js            # Axios instance with automated JWT interceptors
│   │   ├── App.jsx               # Client-side router & protected routes
│   │   ├── main.jsx              # React DOM initialization
│   │   └── index.css             # Tailwind base and utility directives
│   ├── package.json              # NPM package manifest
│   ├── tailwind.config.js        # Tailwind design configuration
│   └── vite.config.js            # Vite build configuration
├── database/
│   ├── schema.sql                # Complete MySQL relational database schema
│   └── seed.sql                  # Initial mock data, categories, and sample posts
└── README.md


d, Author or Admin)AdminGET /api/admin/stats — Platform-wide statistics (Protected, Admin only)GET /api/admin/categories — List all categories
