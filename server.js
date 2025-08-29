const express = require("express");
const axios = require("axios");
const app = express();
const port = 4000;

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get("/health", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:3000/api/health");
    res.status(200).json({
      status: "OK",
      message: "Node.js server is healthy and connected to Next.js",
      nextJsStatus: response.data,
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Failed to connect to Next.js",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Node.js server running on http://localhost:${port}`);
});

