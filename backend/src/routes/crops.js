
const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET: All crops
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM crops ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Failed to fetch crops:", error.message);
    res.status(500).json({ error: "Failed to fetch crops" });
  }
});

// POST: Add a new crop
router.post("/", async (req, res) => {
  try {
    const { name, field_name, planting_date, expected_harvest_date, status } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Crop name is required" });
    }

    const result = await pool.query(
      `INSERT INTO crops (name, field_name, planting_date, expected_harvest_date, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        name.trim(),
        field_name || null,
        planting_date || null,
        expected_harvest_date || null,
        status || "Planned",
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Failed to add crop:", error.message);
    res.status(500).json({ error: "Failed to add crop" });
  }
});

// PUT: Update a crop
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, field_name, planting_date, expected_harvest_date, status } = req.body;

    const result = await pool.query(
      `UPDATE crops
       SET name = COALESCE($1, name),
           field_name = COALESCE($2, field_name),
           planting_date = COALESCE($3, planting_date),
           expected_harvest_date = COALESCE($4, expected_harvest_date),
           status = COALESCE($5, status)
       WHERE id = $6
       RETURNING *`,
      [name || null, field_name || null, planting_date || null, expected_harvest_date || null, status || null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Crop not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Failed to update crop:", error.message);
    res.status(500).json({ error: "Failed to update crop" });
  }
});

// DELETE: Remove a crop
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM crops WHERE id = $1 RETURNING id", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Crop not found" });
    }

    res.json({ message: "Crop deleted successfully" });
  } catch (error) {
    console.error("Failed to delete crop:", error.message);
    res.status(500).json({ error: "Failed to delete crop" });
  }
});

module.exports = router;
