
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL error:", err.message);
});

// Test connection on startup
pool.query("SELECT 1").then(() => {
  console.log("✅ PostgreSQL connected successfully");
}).catch((err) => {
  console.error("❌ PostgreSQL connection failed:", err.message);
});

module.exports = pool;
