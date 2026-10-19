const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productsRouter = require("./routes/products");
const categoriesRouter = require("./routes/categories");

const pool = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);

app.get("/", (req, res) => {
  res.json({ message: "OrganicFarming API is running!" });
});

app.get("/api/health/db", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT current_database() AS database"
    );

    res.json({
      status: "connected",
      database: result.rows[0].database,
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    res.status(500).json({
      status: "disconnected",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`OrganicFarming backend running on port ${PORT}`);
});
