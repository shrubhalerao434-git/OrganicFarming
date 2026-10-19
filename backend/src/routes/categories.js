
const express = require("express");
const router = express.Router();

const pool = require("../config/db");

// GET: Retrieve all categories
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM categories ORDER BY id ASC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Failed to fetch categories:", error.message);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// POST: Add a new category
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        error: "Category name is required",
      });
    }

    const result = await pool.query(
      `INSERT INTO categories (name, description)
       VALUES ($1, $2)
       RETURNING *`,
      [name.trim(), description || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        error: "This category already exists",
      });
    }

    console.error("Failed to add category:", error.message);
    res.status(500).json({ error: "Failed to add category" });
  }
});

module.exports = router;
