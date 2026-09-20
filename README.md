# GiftLink — Full Stack Capstone Project

GiftLink is a React + Node.js/Express + MongoDB application for sharing household items.

## Local setup
1. Copy `backend/.env.example` to `backend/.env`.
2. Install:
   `cd backend && npm install`
   `cd ../frontend && npm install`
   `cd ../sentiment && npm install`
3. Seed 16 gifts:
   `cd backend`
   `npm run seed`
4. Start API:
   `npm run dev`
5. In another terminal:
   `cd frontend`
   `npm run dev`
6. Open http://localhost:5173

## Production
Use MongoDB Atlas for the cloud database and set environment variables on your hosting
provider. Never commit `.env` or real secrets.

See `docs/SUBMISSION_CHECKLIST.md` for the 18 Coursera tasks.
