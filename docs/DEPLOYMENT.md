# Production Deployment

Use MongoDB Atlas for the production database. Set `MONGODB_URI`, `DB_NAME`, `JWT_SECRET`,
and `CLIENT_URL` in the backend host. Set `VITE_API_URL` in the frontend host.

Never commit `.env` or production secrets.
