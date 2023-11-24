const express = require("express");
const connectDB = require("./config/database");
const questionRoutes = require("./routes/questionRoutes");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express(); // Initialize the express app here
app.use(express.json());

// Set up CORS after initializing app
const corsOptions = {
  origin: "https://question-paper-generator-seven.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", questionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
