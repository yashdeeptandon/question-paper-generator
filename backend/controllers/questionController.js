// controllers/questionController.js

const Question = require("../models/questionModel");

// Define allowed difficulty levels and their corresponding valid mark ranges
const VALID_DIFFICULTY_MARKS = {
  Easy: 5,
  Medium: 10,
  Hard: 15,
};

// Controller methods for handling questions
exports.getAllQuestions = async (req, res) => {
  try {
    // Fetch all questions from the database
    const questions = await Question.find();

    // Optionally, filter out questions with invalid marks or difficulty
    const validQuestions = questions.filter((q) => {
      const validMarks = VALID_DIFFICULTY_MARKS[q.difficulty];
      return validMarks && q.marks === validMarks;
    });

    res.success(validQuestions, "Questions retrieved successfully");
  } catch (err) {
    res.error(err, "Failed to retrieve questions");
  }
};

exports.createQuestion = async (req, res) => {
  const { question, subject, topic, difficulty, marks } = req.body;

  // Simple validation to check if all required fields are present
  if (!question || !subject || !topic || !difficulty || !marks) {
    return res.error(
      null,
      "Missing required fields: question, subject, topic, difficulty, marks",
      400
    );
  }

  // Validate difficulty and marks
  const validMarks = VALID_DIFFICULTY_MARKS[difficulty];
  if (!validMarks) {
    return res.error(
      null,
      `Invalid difficulty level. Allowed values are: ${Object.keys(
        VALID_DIFFICULTY_MARKS
      ).join(", ")}`,
      400
    );
  }

  if (marks !== validMarks) {
    return res.error(
      null,
      `Invalid marks for difficulty level '${difficulty}'. Expected: ${validMarks}, Received: ${marks}`,
      400
    );
  }

  // Create a new question only if all validations pass
  const newQuestion = new Question({
    question,
    subject,
    topic,
    difficulty,
    marks,
  });

  try {
    const savedQuestion = await newQuestion.save();
    res.success(savedQuestion, "Question created successfully", 201);
  } catch (err) {
    res.error(err, "Failed to create question", 400);
  }
};
