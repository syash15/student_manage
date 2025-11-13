# Students Hub — GitHub-ready Full Stack Student Management System

This repository is prepared to be pushed to GitHub and linked with Vercel (frontend) and Railway (backend).

## What changed vs basic starter
- Full user model (username, fullName, email, role)
- Signup & Login with JWT; `/api/auth/me` endpoint
- Role-based access for student CRUD operations
- `seedAdmin.js` to create an admin user from env vars
- Procfile and `.github/workflows` placeholders for CI/CD

## Quick local run
1. Create a MongoDB Atlas cluster and get the connection URI.
2. Backend:
   - Copy `backend/.env.example` to `backend/.env` and fill values.
   - Run `cd backend && npm install && npm run seed && npm run dev`
3. Frontend:
   - Copy `frontend/.env.example` to `frontend/.env` and set `REACT_APP_API=http://localhost:5000`
   - Run `cd frontend && npm install && npm start`

## Deploying
### 1) Push to GitHub
Create a new public/private repo and push this project (root contains `frontend/` and `backend/`).

### 2) Backend — Railway
- Sign in to Railway and create a new project -> Deploy from GitHub
- Link the backend folder
- Set environment variables on Railway: `MONGODB_URI`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`
- After deploy, run the `seed` script once (Railway provides a console) or have seed run automatically.

### 3) Frontend — Vercel
- Sign in to Vercel and import the GitHub repo
- Set the build folder to `frontend/` (Vercel auto-detects CRA)
- In Project Settings -> Environment Variables, add `REACT_APP_API` pointing to your deployed backend URL (e.g. https://your-backend.up.railway.app)

### Rename site
- On Vercel you can change the subdomain in Project Settings -> General -> Domain. Type `studentshub` (or any name) to set the subdomain.

## GitHub Actions (optional)
You can add GitHub Actions to build and optionally trigger deploys — Vercel and Railway also integrate directly with GitHub and will auto-deploy on push.

## Security notes
- Remove or protect the `/api/auth/signup` endpoint in production.
- Use strong `JWT_SECRET` and store it in Railway's env vars.
- Use HTTPS (Vercel provides it by default).


---

If you're ready, I will:

1. Create a ZIP of this GitHub-ready project (so you can push it to your GitHub repo). ✅
2. Provide exact Git commands to push the repo and step-by-step rails/ Vercel connect instructions (with the values you need to paste) ✅

Download the ZIP once it's ready and tell me when you want the exact push + deploy commands.
