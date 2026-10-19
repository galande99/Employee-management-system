
# Employee Management System

A full-stack Employee Management System built using the MERN stack. The application allows an authenticated user to manage employee records through a responsive dashboard.

## Features

- Login authentication using JWT
- Secure employee API routes
- Create, view, update, and delete employee records
- Search employees by name or email
- Filter employees by employment status
- MongoDB database integration using Mongoose
- Responsive user interface built with React and Tailwind CSS

## Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

## Project Structure

```text
employee-management-system/
├── frontend/
├── backend/
│   ├── src/
│   ├── .env.example
│   └── package.json
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js and npm
- A MongoDB database
- Git

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd employee-management-system
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder using `.env.example` as a reference.

Configure the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=Secret key used to sign and verify JWT tokens
```

### 3. Set up the frontend

Open another terminal at the project root and run:

```bash
cd frontend
npm install
```

### 4. Run the application

Start the backend using the start command configured in `backend/package.json`.

Start the frontend using:

```bash
npm run dev
```

Open the local URL displayed by Vite in your terminal.

## Authentication

Users must log in before accessing protected employee API routes. JWT authentication is handled by the backend.

## Security

- Environment variables are excluded from version control.
- The `.env.example` file documents required configuration without exposing real credentials.

## Author

Abhilesh Galande
