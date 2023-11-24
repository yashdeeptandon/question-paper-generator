import React, { useState, useEffect } from "react";
import { getQuestions } from "../api";
import "./QuestionPaperGenerator.css";
import axios from "axios";

const baseURL = "https://question-paper-generator-okl0.onrender.com/api";
const api = axios.create({ baseURL });

const fetchQuestionsFromBackend = async (setQuestionStore) => {
  try {
    const response = await getQuestions();
    if (Array.isArray(response)) {
      setQuestionStore(response);
    } else {
      console.log("Not a array");
      // Handle unexpected data format from the API
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
    // Handle error if necessary
  }
};

const QuestionPaperGenerator = () => {
  const [totalMarks, setTotalMarks] = useState(0);
  const [easyPercent, setEasyPercent] = useState(0);
  const [mediumPercent, setMediumPercent] = useState(0);
  const [hardPercent, setHardPercent] = useState(0);
  const [questionPaper, setQuestionPaper] = useState([]);
  const [questionStore, setQuestionStore] = useState([]);

  useEffect(() => {
    if (questionStore.length === 0) fetchQuestionsFromBackend(setQuestionStore);
  }, [questionStore]);

  const generateQuestionPaper = () => {
    if (!Array.isArray(questionStore)) {
      console.error("Error: questionStore is not an array");
      return;
    }

    const totalEasyCount = Math.min(
      Math.round((easyPercent / 100) * (totalMarks / 5)),
      questionStore.filter((q) => q.difficulty === "Easy").length
    );

    const totalMediumCount = Math.min(
      Math.round((mediumPercent / 100) * (totalMarks / 10)),
      questionStore.filter((q) => q.difficulty === "Medium").length
    );

    const totalHardCount = Math.min(
      Math.round((hardPercent / 100) * (totalMarks / 15)),
      questionStore.filter((q) => q.difficulty === "Hard").length
    );

    const selectedQuestions = [];

    const selectQuestionsByDifficulty = (difficulty, count, marks) => {
      const filteredQuestions = questionStore.filter(
        (q) => q.difficulty === difficulty && q.marks === marks
      );
      for (let i = 0; i < count; i++) {
        if (filteredQuestions.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * filteredQuestions.length
          );
          selectedQuestions.push(filteredQuestions[randomIndex]);
          filteredQuestions.splice(randomIndex, 1);
        } else {
          break;
        }
      }
    };

    selectQuestionsByDifficulty("Easy", totalEasyCount, 5);
    selectQuestionsByDifficulty("Medium", totalMediumCount, 10);
    selectQuestionsByDifficulty("Hard", totalHardCount, 15);

    setQuestionPaper(selectedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/generate-paper", {
        totalMarks,
        easyPercent,
        mediumPercent,
        hardPercent,
      });

      setQuestionPaper(response.questions);
      generateQuestionPaper();
    } catch (error) {
      console.error("Error generating question paper:", error);
      // Handle error if necessary
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="total-marks">
          <label htmlFor="total-marks">Total Marks: </label>
          <input
            type="number"
            id="total-marks"
            name="total-marks"
            value={isNaN(totalMarks) ? "" : totalMarks}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value)) {
                setTotalMarks(value);
              }
            }}
          />
        </div>

        <div className="difficulty-levels">
          <label>Enter Difficulty Levels of Questions:</label>
          <div>
            <label htmlFor="easy">Easy: </label>
            <input
              type="number"
              id="easy"
              name="easy"
              value={isNaN(easyPercent) ? "" : easyPercent}
              onChange={(e) => setEasyPercent(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="medium">Medium: </label>
            <input
              type="number"
              id="medium"
              name="medium"
              value={isNaN(mediumPercent) ? "" : mediumPercent}
              onChange={(e) => setMediumPercent(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="hard">Hard: </label>
            <input
              type="number"
              id="hard"
              name="hard"
              value={isNaN(hardPercent) ? "" : hardPercent}
              onChange={(e) => setHardPercent(parseInt(e.target.value))}
            />
          </div>
        </div>

        <input type="submit" value="Generate Paper" />
      </form>

      <div className="question-paper">
        <h3>Generated Question Paper:</h3>
        <ul>
          {questionPaper.length > 0 ? (
            questionPaper.map((question, index) => (
              <li key={index}>
                <strong>{question.question}</strong> - {question.difficulty},
                Marks: {question.marks}
              </li>
            ))
          ) : (
            <p>No questions available for the specified criteria.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default QuestionPaperGenerator;
