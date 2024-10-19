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

    // Helper function to filter questions by difficulty and marks
    const filterQuestions = (questions, difficulty, marks, count) => {
      const filteredQuestions = questions.filter(
        (q) => q.difficulty === difficulty && q.marks === marks
      );

      // Check if we have enough questions of this type
      if (filteredQuestions.length < count) {
        // Throw a specific error if not enough questions are available
        throw new Error(
          `Not enough ${difficulty} questions available. Requested: ${count}, Available: ${filteredQuestions.length}. Please add more ${difficulty} questions to the database.`
        );
      }

      // Return the sliced questions
      return filteredQuestions.slice(0, count);
    };

    // Filter and select questions for each difficulty level
    const easyQuestions = filterQuestions(allQuestions, "Easy", 5, easyCount);
    const mediumQuestions = filterQuestions(
      allQuestions,
      "Medium",
      10,
      mediumCount
    );
    const hardQuestions = filterQuestions(allQuestions, "Hard", 15, hardCount);

    console.log("Selected Easy Questions: ", easyQuestions.length);
    console.log("Selected Medium Questions: ", mediumQuestions.length);
    console.log("Selected Hard Questions: ", hardQuestions.length);

    console.log(
      "Selected Easy Marks: ",
      easyQuestions.reduce((total, q) => total + q.marks, 0)
    );
    console.log(
      "Selected Medium Marks: ",
      mediumQuestions.reduce((total, q) => total + q.marks, 0)
    );
    console.log(
      "Selected Hard Marks: ",
      hardQuestions.reduce((total, q) => total + q.marks, 0)
    );

    // Combine all selected questions
    const selectedQuestions = [
      ...easyQuestions,
      ...mediumQuestions,
      ...hardQuestions,
    ];

    // Calculate total marks of selected questions
    const selectedMarks = selectedQuestions.reduce(
      (total, q) => total + q.marks,
      0
    );

    // Check if selected questions match the total marks
    if (selectedMarks !== totalMarks) {
      return res.error(
        null,
        `Selected questions do not add up to the specified total marks. Selected Marks: ${selectedMarks}`,
        400
      );
    }

    // Create and return the question paper
    const questionPaper = {
      totalMarks,
      questions: selectedQuestions,
    };

    res.success(questionPaper, "Question paper generated successfully");
  } catch (err) {
    logger.error(`Error generating question paper: ${err.message}`);
    // Return the error message with a 400 status code
    return res.error(
      null,
      `Error generating question paper: ${err.message}`,
      400
    );
  }
};

// Route for generating question paper (POST request)
router.post("/generate-paper", generateQuestionPaper);

module.exports = { generateQuestionPaper };
``;
