# TaskFlow — Premium Todo & Task Management App

A production-ready full-stack MERN Todo/Task Management app with modern SaaS-style UI.

## Tech Stack
- **Frontend:** React 18 + Vite + Tailwind CSS + Framer Motion
- **Backend:** Node.js + Express.js + MongoDB + Mongoose
- **Auth:** JWT + bcrypt
- **State:** Redux Toolkit
- **HTTP:** Axios

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Backend
```bash
cd backend
cp .env.example .env   # Edit with your values
npm install
npm run dev
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Deployment

### Backend → Render
1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repo, set root directory to `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables from `.env.example`

### Frontend → Vercel
1. Import project on [Vercel](https://vercel.com)
2. Set root directory to `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add `VITE_API_URL` env var pointing to your Render backend URL

### MongoDB → Atlas
1. Create free cluster at [MongoDB Atlas](https://cloud.mongodb.com)
2. Get connection string and add to backend `.env`

## Features
- JWT Authentication (signup, login, logout, remember me)
- User profiles with avatar upload
- Full CRUD tasks with priority, categories, due dates, subtasks, tags, notes
- Drag & drop reorder
- Filters, search, calendar view
- Dashboard with stats & charts
- Collaboration & task sharing
- Dark/light mode
- Export tasks CSV/JSON
- Mobile-first premium UI with glassmorphism, animations
- Toast notifications
# TodoApp0.2
# TodoApp
