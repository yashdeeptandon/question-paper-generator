const express = require("express");
const router = express.Router();
const Question = require("../models/questionModel");

// Function to generate the question paper based on criteria
const generateQuestionPaper = async (req, res) => {
  const { totalMarks, easyCount, mediumCount, hardCount } = req.body;

  try {
    // Fetch all questions from the database
    const allQuestions = await Question.find();

    // Filter questions based on difficulty and marks
    const easyQuestions = allQuestions
      .filter((q) => q.difficulty === "Easy" && q.marks === 5)
      .slice(0, easyCount);

    const mediumQuestions = allQuestions
      .filter((q) => q.difficulty === "Medium" && q.marks === 10)
      .slice(0, mediumCount);

    const hardQuestions = allQuestions
      .filter((q) => q.difficulty === "Hard" && q.marks === 15)
      .slice(0, hardCount);

    const selectedQuestions = [
      ...easyQuestions,
      ...mediumQuestions,
      ...hardQuestions,
    ];

    const questionPaper = {
      totalMarks,
      questions: selectedQuestions,
    };

    res.status(200).json(questionPaper);
  } catch (err) {
    res.status(500).json({ message: "Error generating question paper" });
  }
};

// Route for generating question paper (POST request)
router.post("/generate-paper", generateQuestionPaper);

module.exports = { generateQuestionPaper };
