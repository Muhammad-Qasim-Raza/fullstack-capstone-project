const express = require("express");
const { ObjectId } = require("mongodb");
const { connectToDatabase } = require("../db");
const { authRequired } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const db = await connectToDatabase();
    res.json(await db.collection("gifts").find({}).sort({ createdAt: -1 }).toArray());
  } catch (e) { next(e); }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: "Invalid item id" });
    const db = await connectToDatabase();
    const gift = await db.collection("gifts").findOne({ _id: new ObjectId(req.params.id) });
    if (!gift) return res.status(404).json({ message: "Gift not found" });
    res.json(gift);
  } catch (e) { next(e); }
});

router.post("/:id/comments", authRequired, async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: "Invalid item id" });
    const text = String(req.body.text || "").trim();
    if (!text) return res.status(400).json({ message: "Comment is required" });

    const db = await connectToDatabase();
    const comment = { userId: req.user.id, name: req.user.name, text, createdAt: new Date() };
    const result = await db.collection("gifts").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $push: { comments: comment } }
    );
    if (!result.matchedCount) return res.status(404).json({ message: "Gift not found" });
    res.status(201).json(comment);
  } catch (e) { next(e); }
});

module.exports = router;
