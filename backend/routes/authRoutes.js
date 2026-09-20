const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const { connectToDatabase } = require("../db");
const { authRequired } = require("../middleware/auth");

const router = express.Router();

function publicUser(user) {
  return { id: user._id.toString(), name: user.name, email: user.email };
}

function tokenFor(user) {
  return jwt.sign(
    { id: user._id.toString(), name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

router.post("/register", async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!name || !email || password.length < 6)
      return res.status(400).json({ message: "Name, email and password (6+ chars) are required" });

    const collection = db.collection("users");
    const existing = await collection.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 12);
    const result = await collection.insertOne({ name, email, passwordHash, createdAt: new Date() });
    const user = { _id: result.insertedId, name, email };
    res.status(201).json({ user: publicUser(user), token: tokenFor(user) });
  } catch (e) { next(e); }
});

router.post("/login", async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const user = await db.collection("users").findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.passwordHash)))
      return res.status(401).json({ message: "Invalid email or password" });

    res.json({ user: publicUser(user), token: tokenFor(user) });
  } catch (e) { next(e); }
});

router.put("/profile", authRequired, async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const name = String(req.body.name || "").trim();
    if (!name) return res.status(400).json({ message: "Name is required" });

    const id = new ObjectId(req.user.id);
    await db.collection("users").updateOne({ _id: id }, { $set: { name, updatedAt: new Date() } });
    const user = await db.collection("users").findOne({ _id: id });
    res.json({ user: publicUser(user), token: tokenFor(user) });
  } catch (e) { next(e); }
});

module.exports = router;
