
const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const crypto = require("crypto");

/** Simple SHA-256 hash — for production use bcrypt instead */
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// POST: Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "name, email and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const hashed = hashPassword(password);

    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [name.trim(), email.trim().toLowerCase(), hashed]
    );

    const user = result.rows[0];
    // Simple token: base64 of id:email (replace with JWT in production)
    const token = Buffer.from(`${user.id}:${user.email}`).toString("base64");

    res.status(201).json({ ...user, token });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ error: "An account with this email already exists" });
    }
    console.error("Register error:", error.message);
    res.status(500).json({ error: "Registration failed" });
  }
});

// POST: Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const hashed = hashPassword(password);

    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE email = $1 AND password_hash = $2",
      [email.trim().toLowerCase(), hashed]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];
    const token = Buffer.from(`${user.id}:${user.email}`).toString("base64");

    res.json({ ...user, token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
