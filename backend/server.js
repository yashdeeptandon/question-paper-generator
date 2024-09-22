// server.js

const express = require("express");
const connectDB = require("./config/database");
const questionRoutes = require("./routes/questionRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
const responseMiddleware = require("./middleware/responseMiddleware");
const logger = require("./config/logger");

dotenv.config();

const app = express(); // Initialize the express app here
app.use(express.json());

// Set up CORS after initializing app
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Use the response middleware
app.use(responseMiddleware);

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", questionRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res
    .status(500)
    .json({
      success: false,
      status: 500,
      message: "Internal Server Error",
      error: err.message,
    });
});

const PORT = process.env.PORT || 8080; // Use the Render-provided port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  logger.info(`Server running on port ${PORT}`);
});
