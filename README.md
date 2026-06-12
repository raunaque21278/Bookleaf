# 📚 BookLeaf Support Portal

A full-stack internal support management platform built for a fictional self-publishing company.

BookLeaf Support Portal enables authors to raise publishing-related support requests while providing administrators with tools to efficiently manage, track, and resolve tickets. The platform also includes AI-powered ticket assistance and real-time communication.

---

## 🚀 Features

### Authors

- View books and royalty information
- Create support tickets
- Track ticket status
- Real-time chat with support team
- AI-powered ticket assistance
- Secure authentication

### Admins

- Manage support tickets
- Filter by status and priority
- Assign tickets
- Add internal notes
- Update ticket statuses
- Real-time communication with authors
- Dashboard overview and analytics

---

## 🔒 Security

### JWT Authentication

- Secure login system
- Protected API routes
- Role-based authorization

### Single Device Login Restriction

To improve security, only **one active session per account** is allowed.

When a user logs in from a new device or PC:

- Previous sessions are invalidated
- Multiple simultaneous logins are prevented
- Credential sharing risks are reduced
- Author and admin data remain protected

This feature was intentionally implemented as an additional security measure.

---

## 🛠️ Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- Axios
- React Context API
- Socket.IO Client

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Socket.IO
- JWT Authentication
- Groq LLM API

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📂 Project Structure

### Frontend

```bash
src/
├── api/
├── components/
├── context/
├── pages/
├── routes/
└── assets/
```

### Backend

```bash
src/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── sockets/
├── utils/
└── server.js
```

---

## 🏗️ Architecture Decisions

### Why MERN Stack?

The MERN stack was chosen because it provides:

- Fast full-stack development
- Strong JavaScript ecosystem
- Easy frontend-backend integration
- Flexible MongoDB document structure
- Real-time communication through Socket.IO

### Frontend Decisions

#### Context API

Used for:

- Authentication state
- Socket connection state

Chosen over Redux because:

- Smaller project scope
- Less boilerplate
- Faster implementation

#### Reusable Components

Examples:

- StatCard
- StatusBadge
- PriorityPill
- FancyDropdown
- LoadingSpinner

Benefits:

- Consistency
- Maintainability
- Reusability

### Backend Decisions

Separation of concerns:

- Routes → Endpoint mapping
- Controllers → Request handling
- Services → Business logic & AI integration
- Models → Database schemas
- Middleware → Authentication & error handling
- Sockets → Real-time communication

Benefits:

- Scalability
- Maintainability
- Easier debugging

---

## 🤖 AI Integration

### Provider

Groq LLM API

### Model

```bash
llama3-70b-8192
```

### Purpose

AI assists authors while creating support tickets by suggesting:

- Possible solutions
- Next actions
- Publishing-related guidance

### Prompt Strategy

```text
You are a publishing support assistant.

Suggest helpful next actions for this author issue.

Keep responses concise, professional, and relevant to BookLeaf publishing workflows.
```

### Error Handling

Handled scenarios:

- Missing API key
- API timeout
- Invalid responses
- Rate limits
- Provider failures

Fallback response:

```js
AI suggestion unavailable right now.
Please contact support manually.
```

### Cost Optimization

- Minimal prompt size
- Limited context sent to AI
- AI invoked only during ticket assistance
- No AI calls during dashboard or listing operations

---

## ⚡ Real-Time Features

Socket.IO powers:

- Live ticket updates
- Real-time chat
- Status synchronization
- Instant admin-author communication

---

## 📖 API Documentation

### Local

```bash
http://localhost:5000/api-docs
```

### Production

```bash
https://your-render-backend.onrender.com/api-docs
```

---

## 🔌 API Endpoints

### Authentication

```http
POST /api/auth/login
```

### Books

```http
GET /api/books/my-books
```

### Tickets

```http
GET /api/tickets
POST /api/tickets
GET /api/tickets/:id
POST /api/tickets/:id/respond
```

### Admin

```http
GET /api/admin/dashboard
PATCH /api/admin/tickets/:id
```

---

## 💻 Local Setup

### 1. Clone Repository

```bash
git clone https://github.com/raunaque21278/Bookleaf.git
cd Bookleaf
```

---

### 2. Backend Setup

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

### 3. Frontend Setup

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

## 🚀 Deployment

### Backend (Render)

Environment Variables:

```env
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=
GROQ_API_KEY=
CLIENT_URL=
NODE_ENV=production
```

### Frontend (Vercel)

Environment Variables:

```env
VITE_API_URL=
VITE_SOCKET_URL=
```

---

## ⚠️ Known Limitations

### No File Attachments

Currently unsupported:

- Manuscript uploads
- Screenshots
- Invoice uploads

### Limited AI Context

AI only uses immediate ticket information.

### No Role Management UI

Roles are currently seeded manually.

### Basic Analytics

Dashboard currently provides limited metrics.

### Simplified Authentication

Missing:

- Refresh tokens
- Password reset
- Email verification

### No Automated Testing

Due to assignment time constraints.

---

## 🔮 Future Improvements

- Docker support
- CI/CD pipelines
- Redis caching
- Email notifications
- AI ticket summarization
- AI response suggestions
- Audit logs
- Advanced search
- Role management dashboard
- Granular permissions
- File uploads

---

## 🎯 Demo Credentials

### Admin

```text
Email: admin@bookleaf.com
Password: admin123
```

### Author

```text
Email: any seeded author email
Password: author123
```

---

## 👨‍💻 Author

**Raunaque Khan**

Built to demonstrate:

- MERN Stack Development
- Real-Time Systems with Socket.IO
- AI Integration using Groq
- Authentication & Security
- REST API Design
- Scalable Architecture
