
const express = require("express");
const router = express.Router();

const pool = require("../config/db");

// GET: Retrieve all products
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        p.id,
        p.name,
        p.unit,
        p.quantity,
        p.price,
        p.category_id,
        c.name AS category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Failed to fetch products:", error.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST: Add a new product
router.post("/", async (req, res) => {
  try {
    const { name, category_id, unit, quantity, price } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Product name is required" });
    }

    const result = await pool.query(
      `INSERT INTO products (name, category_id, unit, quantity, price)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        name.trim(),
        category_id || null,
        unit || "kg",
        quantity ?? 0,
        price ?? 0,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Failed to add product:", error.message);
    res.status(500).json({ error: "Failed to add product" });
  }
});

module.exports = router;
