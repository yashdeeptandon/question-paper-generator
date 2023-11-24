const Question = require("../models/questionModel");

// Controller methods for handling questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createQuestion = async (req, res) => {
  const question = new Question({
    question: req.body.question,
    subject: req.body.subject,
    topic: req.body.topic,
    difficulty: req.body.difficulty,
    marks: req.body.marks,
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
