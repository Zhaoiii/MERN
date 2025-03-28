# MERN Stack Project

## Project Overview

This is a full-stack application developed using the MERN (MongoDB, Express.js, React, Node.js) technology stack.

## Technology Stack

### Frontend

- React + TypeScript
- Vite (Build Tool)
- Material UI (UI Component Library)
- TailwindCSS (Styling Tool)
- React Hook Form (Form Handling)
- Redux (State Management)

### Backend

- Node.js + TypeScript
- Express.js
- MongoDB (Database)
- JWT (Authentication)
- bcrypt (Password Encryption)

## Project Structure

```
├── client/                 # Frontend project directory
│   ├── src/               # Source code
│   │   ├── assets/       # Static assets
│   │   ├── components/   # Common components
│   │   ├── layout/       # Layout components
│   │   ├── pages/        # Page components
│   │   ├── routes/       # Route configuration
│   │   ├── services/     # API services
│   │   ├── store/        # State management
│   │   └── utils/        # Utility functions
│   └── public/           # Public assets
└── server/                # Backend project directory
    ├── src/              # Source code
    │   ├── config/       # Configuration files
    │   ├── controllers/  # Controllers
    │   ├── middleware/   # Middleware
    │   ├── models/       # Data models
    │   ├── routes/       # Route configuration
    │   └── utils/        # Utility functions
```

## Installation and Running

### Installing Dependencies

1. Install root directory dependencies

```bash
pnpm install
```

2. Install frontend dependencies

```bash
cd client
pnpm install
```

3. Install backend dependencies

```bash
cd server
pnpm install
```

### Starting the Project

1. Start the backend server

```bash
cd server
pnpm dev
```

2. Start the frontend development server

```bash
cd client
pnpm dev
```
