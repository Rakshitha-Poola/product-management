# Product Management Application

A full-stack Product Management application built using the MERN stack with TypeScript.  
This project demonstrates backend API development, frontend integration, pagination, filtering, and a clean Git workflow.

---

## Tech Stack

- MongoDB
- Express.js
- Node.js
- Next.js (React)
- TypeScript

## Features

Backend:
- REST APIs for product management
- Cursor-based pagination
- Search and filter support
- MongoDB with Mongoose
- Environment-based configuration
- TypeScript with Express

Frontend:
- Next.js with TypeScript
- Server-Side Rendering (SSR)
- Product listing with pagination
- Filters by name, category, and price range
- Add products with stock quantity
- Responsive UI

Engineering:
- Feature-branch-based Git workflow
- Pull Requests merged into main
- Secure handling of environment variables
- Proper .gitignore configuration
- Clean project structure

---

## Project Structure

product-management/
├── server/
│   └── src/
│       ├── config/
│       ├── constants/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── services/
│       ├── types/
│       └── server.ts
├── client/
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       ├── styles/
│       └── types/
├── .gitignore
└── README.md

---

## Environment Handling

The project supports two environments:

- Test environment (`.env.test`)
- Production environment (`.env.production`)

The backend loads the correct environment configuration based on the `NODE_ENV` value.

Example:

Test mode:
NODE_ENV=test

Production mode:
NODE_ENV=production

Environment variables are validated and exported using `env.config.ts`.

Note: Sensitive environment files are not committed.  
An example structure is shown above for reference.

## Prerequisites

- Node.js v18+
- MongoDB
- npm

---

## Environment Variables

Environment files are not committed.

Backend:
server/.env.test  
server/.env.production  

Example:
PORT=4000  
MONGODB_URI=mongodb://localhost:27017/product-management  
CORS_ORIGIN=http://localhost:3000  

Frontend:
client/.env.local

Example:
NEXT_PUBLIC_API_BASE_URL=http://localhost:5001  

---

## Running the Project

Backend:
cd server  
npm install  
npm run dev  

Backend runs on http://localhost:5001

Frontend:
cd client  
npm install  
npm run dev  

Frontend runs on http://localhost:3000

---

## API Endpoints

GET /api/products  
POST /api/products  

Pagination is implemented using a cursor-based approach.

---

## Git Workflow

- feature/backend-api
- feature/frontend-ui
- All changes merged into main using Pull Requests


## Backend
Backend APIs implemented with cursor pagination.
