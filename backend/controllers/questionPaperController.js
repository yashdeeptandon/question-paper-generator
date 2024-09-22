// controllers/questionPaperController.js

const express = require("express");
const router = express.Router();
const Question = require("../models/questionModel");
const logger = require("../config/logger");

// Function to generate the question paper based on criteria
const generateQuestionPaper = async (req, res) => {
  const { totalMarks, easyCount, mediumCount, hardCount } = req.body;

  // Validate the input criteria
  if (typeof totalMarks !== "number" || totalMarks <= 0) {
    return res.error(
      null,
      "Invalid totalMarks value. It should be a positive number.",
      400
    );
  }

  if (
    !Number.isInteger(easyCount) ||
    easyCount < 0 ||
    !Number.isInteger(mediumCount) ||
    mediumCount < 0 ||
    !Number.isInteger(hardCount) ||
    hardCount < 0
  ) {
    return res.error(
      null,
      "Invalid count values. easyCount, mediumCount, and hardCount should be non-negative integers.",
      400
    );
  }

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

    // Check if the selected questions meet the required total marks
    const selectedMarks = selectedQuestions.reduce(
      (total, q) => total + q.marks,
      0
    );

    if (selectedMarks !== totalMarks) {
      return res.error(
        null,
        `Selected questions do not add up to the specified total marks. Selected Marks: ${selectedMarks}`,
        400
      );
    }

    const questionPaper = {
      totalMarks,
      questions: selectedQuestions,
    };

    res.success(questionPaper, "Question paper generated successfully");
  } catch (err) {
    logger.error(`Error generating question paper: ${err.message}`);
    res.error(err, "Error generating question paper");
  }
};

// Route for generating question paper (POST request)
router.post("/generate-paper", generateQuestionPaper);

module.exports = { generateQuestionPaper };
