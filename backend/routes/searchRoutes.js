const express = require("express");
const { connectToDatabase } = require("../db");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const { q = "", category = "" } = req.query;
    const filter = {};

    if (category.trim()) filter.category = category.trim();
    if (q.trim()) {
      filter.$or = [
        { title: { $regex: q.trim(), $options: "i" } },
        { description: { $regex: q.trim(), $options: "i" } }
      ];
    }

    res.json(await db.collection("gifts").find(filter).sort({ createdAt: -1 }).toArray());
  } catch (e) { next(e); }
});

module.exports = router;
