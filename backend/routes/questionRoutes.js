// routes/questionRoutes.js

const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const questionPaperController = require("../controllers/questionPaperController");

// Routes for handling questions
router.get("/questions", questionController.getAllQuestions); // Get all questions
router.post("/questions", questionController.createQuestion); // Create a new question

// Route for generating question paper
router.post("/generate-paper", questionPaperController.generateQuestionPaper); // Generate a question paper

module.exports = router;
