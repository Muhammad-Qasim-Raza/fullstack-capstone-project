require("dotenv").config();
const express = require("express");
const cors = require("cors");
const giftRoutes = require("./routes/giftRoutes");
const searchRoutes = require("./routes/searchRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "giftlink-api" }));
app.use("/api/gifts", giftRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/auth", authRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
