FROM node:20-alpine AS backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend/ ./

FROM node:20-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=backend /app/backend ./backend
COPY --from=frontend /app/frontend/dist ./frontend/dist
WORKDIR /app/backend
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "server.js"]
