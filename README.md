# Normie Store

A cliché full-stack MERN e-commerce reduced application.

The project is separated into two independent applications:

```
friendly-normie-store/
│
├── frontend/ # React + Vite frontend application
│
├── backend/ # Express + MongoDB backend API
│
├── .gitignore
└── README.md
```

---

# Tech Stack

## Frontend

- React
- Vite
- React Router

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

# Running The Project

## Backend

Navigate into backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Development mode:

```bash
npm run dev
```

Else use:

```bash
npm start
```

---

## Frontend

Navigate into frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start Vite:

```bash
npm run dev
```

---

# Project Structure

```
backend/
│
├── config/ # Database and application configuration
├── controllers/ # Request handling logic
├── middlewares/ # Custom Express middleware
├── models/ # MongoDB schemas
├── utils/ # Helper functions
└── index.js # Backend entry point
```

```
frontend/

├── src/ # React source code
├── public/ # Static assets
└── package.json # Frontend dependencies
```

# Backend Packages

All backend dependencies are installed inside:

```
backend/package.json
```

## express

**Purpose:**
Web framework used to create the backend API.

Used for:

- Creating routes
- Handling HTTP requests
- Creating middleware pipelines
- Running the server

Example:

```javascript
app.get("/api/products", (req, res) => {
  res.json(products);
});
```

---

## mongoose

**Purpose:**
ODM (Object Data Modeling) library for MongoDB.

Used for:

- Creating schemas
- Defining models
- Communicating with MongoDB

Example:

```javascript
const Product = mongoose.model("Product", productSchema);
```

---

## dotenv

**Purpose:**
Loads environment variables from `.env` files.

Used for keeping secrets outside the codebase.

Example:

```
PORT=5000
MONGO_URI=database_url
JWT_SECRET=my_secret
```

Access:

```javascript
process.env.MONGO_URI;
```

---

## bcryptjs

**Purpose:**
Used for password hashing.

Used for:

- Storing encrypted passwords
- Comparing login passwords

Example:

```javascript
bcrypt.compare(password, hashedPassword);
```

Passwords should never be stored as plain text.

---

## jsonwebtoken (JWT)

**Purpose:**
Creates authentication tokens.

Used for:

- Login sessions
- User authentication
- Protected routes

Example flow:

```
User Login
    |
    v
Validate Password
    |
    v
Create JWT Token
    |
    v
Send Token To Client
```

---

## cookie-parser

**Purpose:**
Reads cookies from incoming requests.

Used with JWT authentication when tokens are stored in HTTP cookies.

Example:

```javascript
req.cookies.token;
```

---

## cors

**Purpose:**
Allows frontend and backend applications running on different origins to communicate.

Example:

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:5000
```

Without CORS configuration, browsers block requests between them.

Example:

```javascript
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
```

---

## body-parser

**Purpose:**
Parses incoming request bodies.

Used for reading JSON/form data.

Example:

```javascript
req.body.email;
```

Note:

Modern Express already includes:

```javascript
express.json();
```

so body-parser is often unnecessary, but it is included for compatibility and learning purposes.

---

## multer

**Purpose:**
Handles file uploads.

Used for:

- Product images
- User profile pictures
- Multipart form data

Example:

```
User uploads image
        |
        v
Multer processes file
        |
        v
Store image information
```

---

## concurrently

**Purpose:**
Runs multiple commands simultaneously.

Example:

Running:

```
Frontend server
+
Backend server
```

with one command.

Usually installed at the root level when managing both frontend and backend together.

---

## nodemon

**Purpose:**
Development utility that automatically restarts the backend server when files change.

Instead of:

```
Stop server
Start server again
```

nodemon does it automatically.

Example:

```bash
npm run dev
```

---

# Environment Variables

Environment files are not committed.

Example:

```
backend/.env
frontend/.env
```

Only example files are committed:

```
backend/.env.example
frontend/.env.example
```

Example:

backend/.env.example

```
PORT=
MONGO_URI=
JWT_SECRET=
```

---

# Git Rules

The following are ignored:

```
node_modules/
.env
.env.*
```

The following are committed:

```
package.json
package-lock.json
.env.example
source code
```

---

# Important Concepts

## Separation of Concerns

Frontend and backend are separate applications.

Frontend responsibilities:

- UI
- User interaction
- Client-side routing
- API requests

Backend responsibilities:

- Authentication
- Database operations
- Business logic
- API endpoints

## API Communication

Frontend communicates with backend through HTTP requests.

Example:

```
React App
    |
    | GET /api/products
    |
    v
Express API
    |
    v
MongoDB
```

---

# Future Improvements

Possible additions:

- Redux / Zustand for state management
- Payment integration
- Image storage service
- Docker setup
- Automated testing
- CI/CD pipeline

---

# Notes

As all other projects this project also follows a separated frontend/backend architecture.
Each application has its own:

- package.json
- node_modules
- environment variables
- development workflow

Just makes the project easier to maintain and deploy independently.
