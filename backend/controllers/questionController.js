// controllers/questionController.js

const Question = require("../models/questionModel");

// Controller methods for handling questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.success(questions, "Questions retrieved successfully");
  } catch (err) {
    res.error(err, "Failed to retrieve questions");
  }
};

exports.createQuestion = async (req, res) => {
  const { question, subject, topic, difficulty, marks } = req.body;

  // Simple validation
  if (!question || !subject || !topic || !difficulty || !marks) {
    return res.error(
      null,
      "Missing required fields: question, subject, topic, difficulty, marks",
      400
    );
  }

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
