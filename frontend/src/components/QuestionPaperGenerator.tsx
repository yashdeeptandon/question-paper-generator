import React, { useState, useEffect } from "react";
import { getQuestions } from "../api.js";
import "./QuestionPaperGenerator.css";
import axios from "axios";
import { Label } from "./ui/label.js";
import { Input } from "./ui/input.js";
import { Button } from "./ui/button.js";
import { BorderBeam } from "./magicui/border-beam.js";

const baseURL = "https://question-paper-generator-okl0.onrender.com/api";
const api = axios.create({ baseURL });

const fetchQuestionsFromBackend = async (setQuestionStore: any) => {
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
      const response: any = await api.post("/generate-paper", {
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
    <main className="w-full h-full flex flex-col">
      <p className="mt-[50px] pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Generate Paper
      </p>
      <section className="w-full flex justify-center mt-[100px]">
        <form
          onSubmit={handleSubmit}
          className="relative w-[40%] min-w-[400px] h-[40%] min-h-[320px] p-5 flex flex-col gap-5 border rounded-xl shadow-lg justify-between"
        >
          <BorderBeam borderWidth={2} />
          <div className="flex flex-row gap-2 items-center">
            <Label htmlFor="total-marks">Total Marks: </Label>
            <Input
              type="text"
              className="w-[150px]"
              id="total-marks"
              name="total-marks"
              value={isNaN(totalMarks) ? "" : totalMarks}
              placeholder="Enter total marks"
              onChange={(e) => setTotalMarks(parseInt(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold text-lg">
              Enter Difficulty Levels of Questions:
            </p>

            <div className="flex flex-row gap-2 items-center">
              <Label htmlFor="easy">Easy: </Label>
              <Input
                className="w-[150px]"
                type="text"
                id="easy"
                name="easy"
                value={isNaN(easyPercent) ? "" : easyPercent}
                onChange={(e) => setEasyPercent(parseInt(e.target.value))}
              />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Label htmlFor="medium">Medium: </Label>
              <Input
                className="w-[150px]"
                type="text"
                id="medium"
                name="medium"
                value={isNaN(mediumPercent) ? "" : mediumPercent}
                onChange={(e) => setMediumPercent(parseInt(e.target.value))}
              />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Label htmlFor="hard">Hard: </Label>
              <Input
                className="w-[150px]"
                type="text"
                id="hard"
                name="hard"
                value={isNaN(hardPercent) ? "" : hardPercent}
                onChange={(e) => setHardPercent(parseInt(e.target.value))}
              />
            </div>
          </div>

          <Button type="submit">Generate Paper</Button>
        </form>
      </section>

      {/* <div className="">
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
      </div> */}
    </main>
  );
};

export default QuestionPaperGenerator;
