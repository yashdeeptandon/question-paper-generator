const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const questionPaperController = require("../controllers/questionPaperController");

// Routes for handling questions
router.get("/questions", questionController.getAllQuestions);
router.post("/questions", questionController.createQuestion);

// Route for generating question paper
router.post("/generate-paper", questionPaperController.generateQuestionPaper);

module.exports = router;
