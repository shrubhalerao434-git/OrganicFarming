
const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET: All stock movements (with product name via join)
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        sm.id,
        sm.product_id,
        p.name AS product_name,
        sm.movement_type,
        sm.quantity,
        sm.notes,
        sm.movement_date
      FROM stock_movements sm
      LEFT JOIN products p ON sm.product_id = p.id
      ORDER BY sm.movement_date DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Failed to fetch stock movements:", error.message);
    res.status(500).json({ error: "Failed to fetch inventory" });
  }
});

// POST: Record a stock movement (IN or OUT)
router.post("/", async (req, res) => {
  try {
    const { product_id, movement_type, quantity, notes } = req.body;

    if (!product_id) {
      return res.status(400).json({ error: "product_id is required" });
    }
    if (!["IN", "OUT"].includes(movement_type)) {
      return res.status(400).json({ error: "movement_type must be IN or OUT" });
    }
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ error: "quantity must be greater than 0" });
    }

    // Record movement
    const result = await pool.query(
      `INSERT INTO stock_movements (product_id, movement_type, quantity, notes)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [product_id, movement_type, quantity, notes || null]
    );

    // Update product quantity
    const sign = movement_type === "IN" ? "+" : "-";
    await pool.query(
      `UPDATE products SET quantity = quantity ${sign} $1, updated_at = NOW() WHERE id = $2`,
      [quantity, product_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Failed to record stock movement:", error.message);
    res.status(500).json({ error: "Failed to record stock movement" });
  }
});

module.exports = router;
