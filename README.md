# BookLeaf Support Portal

## Overview
BookLeaf Support Portal is a full-stack internal support management platform built for a fictional self-publishing company.

The platform allows:

### Authors
- View royalty/book details
- Raise support tickets
- Chat with support team
- Receive AI-generated ticket suggestions

### Admins
- Manage incoming tickets
- Filter tickets by status/priority
- Add internal notes
- Assign tickets
- Respond in real time

---

# Tech Stack

## Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Context API
- Socket.IO Client

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Socket.IO
- JWT Authentication
- Groq LLM API

## Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

# Local Setup

## 1. Clone Repository

```bash
git clone https://github.com/raunaque21278/Bookleaf.git
cd Bookleaf
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000
NODE_ENV=development

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=supersecretjwt
JWT_EXPIRES_IN=7d

GROQ_API_KEY=your_groq_api_key

CLIENT_URL=http://localhost:5173
```

Run backend:

```bash
npm run dev
```

Seed database:

```bash
npm run seed
```

---

## 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

Frontend:
```bash
http://localhost:5173
```

Backend:
```bash
http://localhost:5000
```

---

# Architecture Decisions

## Why MERN Stack?
The MERN stack was selected because:

- Fast full-stack development
- Strong JavaScript ecosystem
- Easy API/frontend integration
- MongoDB flexibility for ticket + book document models
- Real-time communication via Socket.IO

---

## Frontend Architecture

Folder structure:

```bash
src/
  api/
  components/
  context/
  pages/
  routes/
```

### Decisions

### Context API
Used for:
- Authentication state
- Socket connection state

Chosen over Redux because:
- Smaller project scope
- Less boilerplate
- Faster implementation

### Reusable UI Components
Examples:
- StatCard
- StatusBadge
- PriorityPill
- FancyDropdown
- LoadingSpinner

Benefits:
- consistency
- maintainability
- reusability

---

## Backend Architecture

Folder structure:

```bash
src/
  controllers/
  models/
  routes/
  middleware/
  services/
  sockets/
  utils/
```

### Why this structure?

Separation of concerns:

- Routes → endpoint mapping
- Controllers → request handling
- Services → business logic / AI integration
- Models → database schemas
- Middleware → auth / errors
- Sockets → real-time events

Benefits:
- scalable
- maintainable
- easier debugging

---

# AI Integration

## Provider
Groq LLM API

Model used:

```bash
llama3-70b-8192
```

---

## Prompt Strategy

AI helps authors while creating support tickets.

Prompt includes:
- ticket title
- ticket description
- issue context
- internal publishing support knowledge

Example prompt:

```text
You are a publishing support assistant.

Suggest helpful next actions for this author issue.

Keep responses concise, professional, and relevant to BookLeaf publishing workflows.
```

Why:
- domain-specific suggestions
- focused outputs
- less hallucination risk

---

## Error Handling

Handled cases:
- API timeout
- invalid AI response
- missing API key
- rate limits
- provider failures

Fallback response:

```js
AI suggestion unavailable right now.
Please contact support manually.
```

This ensures ticket creation continues even if AI fails.

---

## Cost Management

### Prompt minimization
Only essential context is sent.

Avoid:
- full conversation history
- redundant metadata

### Controlled invocation
AI only runs during ticket assistance.

Not triggered for:
- dashboard loading
- ticket listing
- polling actions

### Efficient provider
Groq was selected for:
- fast inference
- lower cost
- simple integration

---

# API Documentation

Swagger docs available at:

Local:
```bash
http://localhost:5000/api-docs
```

Production:
```bash
https://your-render-backend.onrender.com/api-docs
```

Core endpoints:

## Auth
```http
POST /api/auth/login
```

## Books
```http
GET /api/books/my-books
```

## Tickets
```http
GET /api/tickets
POST /api/tickets
GET /api/tickets/:id
POST /api/tickets/:id/respond
```

## Admin
```http
GET /api/admin/dashboard
PATCH /api/admin/tickets/:id
```

---

# Deployment

## Backend (Render)

Environment variables:

```env
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=
GROQ_API_KEY=
CLIENT_URL=
NODE_ENV=production
```

---

## Frontend (Vercel)

Environment variables:

```env
VITE_API_URL=
VITE_SOCKET_URL=
```

---

# Known Limitations

## 1. No File Attachments
Currently ticket attachments are not supported.

Future improvements:
- manuscript uploads
- invoice uploads
- screenshots

---

## 2. Limited AI Context
AI only uses immediate ticket information.

Future:
- ticket history awareness
- personalized author context

---

## 3. No Role Management UI
Roles are seeded manually.

Future:
- admin user management dashboard

---

## 4. Basic Analytics
Dashboard currently provides limited metrics.

Future:
- SLA tracking
- ticket trend analysis
- response performance reports

---

## 5. Simplified Authentication
JWT authentication is implemented.

Missing:
- refresh tokens
- password reset
- email verification

---

## 6. No Automated Testing
Due to assignment time constraints.

Future:
- Jest
- Supertest
- React Testing Library

---

# Future Improvements

With more development time:

- Docker support
- CI/CD pipeline
- Redis caching
- AI ticket summarization
- email notifications
- audit logs
- advanced search
- granular permissions

---

# Demo Credentials

## Admin
```bash
Email: admin@bookleaf.com
Password: admin123
```

## Author
```bash
Email: any seeded author email
Password: author123
```

---

# Author
**Raunaque Khan**
