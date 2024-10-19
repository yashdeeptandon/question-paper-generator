import React, { useState, useEffect } from "react";
import { getQuestionPaper, getQuestions } from "../api.js";
import "./QuestionPaperGenerator.css";
import { Label } from "./ui/label.js";
import { Input } from "./ui/input.js";
import { Button } from "./ui/button.js";
import { BorderBeam } from "./magicui/border-beam.js";
import { ToastContainer } from "react-toastify";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { QuestionsSliceActions } from "../redux/reducer/question-slice.js";

const baseURL = `${import.meta.env.VITE_BASE_URL}/api`; // Your backend URL
console.log(baseURL); // This should log the value of VITE_BASE_URL

interface QuestionsProperties {
  difficulty: string;
  marks: number;
  question: string;
  subject: string;
  topic: string;
}

const fetchQuestionsFromBackend = async (
  setQuestionStore: (response) => void
) => {
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
  const [questionPaper, setQuestionPaper] = useState<QuestionsProperties[]>([]);
  const [questionStore, setQuestionStore] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (questionStore.length === 0) fetchQuestionsFromBackend(setQuestionStore);
  }, [questionStore]);

  // const generateQuestionPaper = () => {
  //   if (!Array.isArray(questionStore)) {
  //     console.error("Error: questionStore is not an array");
  //     return;
  //   }

  //   const totalEasyCount = Math.min(
  //     Math.round((easyPercent / 100) * (totalMarks / 5)),
  //     questionStore.filter((q) => q.difficulty === "Easy").length
  //   );

  //   const totalMediumCount = Math.min(
  //     Math.round((mediumPercent / 100) * (totalMarks / 10)),
  //     questionStore.filter((q) => q.difficulty === "Medium").length
  //   );

  //   const totalHardCount = Math.min(
  //     Math.round((hardPercent / 100) * (totalMarks / 15)),
  //     questionStore.filter((q) => q.difficulty === "Hard").length
  //   );

  //   const selectedQuestions = [];

  //   const selectQuestionsByDifficulty = (difficulty, count, marks) => {
  //     const filteredQuestions = questionStore.filter(
  //       (q) => q.difficulty === difficulty && q.marks === marks
  //     );
  //     for (let i = 0; i < count; i++) {
  //       if (filteredQuestions.length > 0) {
  //         const randomIndex = Math.floor(
  //           Math.random() * filteredQuestions.length
  //         );
  //         selectedQuestions.push(filteredQuestions[randomIndex]);
  //         filteredQuestions.splice(randomIndex, 1);
  //       } else {
  //         break;
  //       }
  //     }
  //   };

  //   selectQuestionsByDifficulty("Easy", totalEasyCount, 5);
  //   selectQuestionsByDifficulty("Medium", totalMediumCount, 10);
  //   selectQuestionsByDifficulty("Hard", totalHardCount, 15);

  //   setQuestionPaper(selectedQuestions);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getQuestionPaper({
        totalMarks,
        easyCount: easyPercent,
        mediumCount: mediumPercent,
        hardCount: hardPercent,
      });
      console.log("Response:", response);
      if (response?.status === 200) {
        setQuestionPaper(response?.data?.questions);
        dispatch(QuestionsSliceActions.setQuestions(response?.data?.questions));
        navigate("/generate-paper/questions");
      }
      // generateQuestionPaper();
    } catch (error) {
      console.error("Error generating question paper:", error);
      dispatch(QuestionsSliceActions.toInitialState());
      // Handle error if necessary
    }
  };

  console.log("Question Paper", questionPaper);

  return (
    <main className="w-full h-full flex flex-col">
      <ToastContainer />
      <p className="mt-[50px] w-full pointer-events-none bg-gradient-to-b from-black to-gray-300/80 dark:from-white dark:to-slate-900/10 bg-clip-text text-center text-4xl md:text-8xl font-semibold leading-none text-transparent">
        Generate Paper
      </p>

      <section className="w-full flex justify-center mt-[30px] md:mt-[100px]">
        <form
          onSubmit={handleSubmit}
          className="relative w-[90%] md:w-[40%] min-w-[300px] h-auto md:h-[40%] min-h-[320px] p-5 flex flex-col gap-5 border rounded-xl shadow-lg justify-between"
        >
          <BorderBeam borderWidth={2} />

          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <Label htmlFor="total-marks">Total Marks: </Label>
            <Input
              className="w-full md:w-[150px]"
              type="text"
              id="total-marks"
              value={isNaN(totalMarks) ? "" : totalMarks}
              placeholder="Enter total marks"
              onChange={(e) => setTotalMarks(parseInt(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-5">
            <p className="font-semibold text-lg">
              Enter Difficulty Levels of Questions:
            </p>

            <div className="flex flex-col md:flex-row gap-2 items-center">
              <Label htmlFor="easy">Easy Questions: </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info color="hsl(var(--foreground))" size={20} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Each Easy question is 5 Marks.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Input
                className="w-full md:w-[50px]"
                type="text"
                id="easy"
                value={isNaN(easyPercent) ? "" : easyPercent}
                onChange={(e) => setEasyPercent(parseInt(e.target.value))}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-2 items-center">
              <Label htmlFor="medium">Medium Questions: </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info color="hsl(var(--foreground))" size={20} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Each Medium question is 10 Marks.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Input
                className="w-full md:w-[50px]"
                type="text"
                id="medium"
                value={isNaN(mediumPercent) ? "" : mediumPercent}
                onChange={(e) => setMediumPercent(parseInt(e.target.value))}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-2 items-center">
              <Label htmlFor="hard">Hard Questions: </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info color="hsl(var(--foreground))" size={20} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Each Hard question is 15 Marks.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Input
                className="w-full md:w-[50px]"
                type="text"
                id="hard"
                value={isNaN(hardPercent) ? "" : hardPercent}
                onChange={(e) => setHardPercent(parseInt(e.target.value))}
              />
            </div>
          </div>

          <Button type="submit" className="mt-4">
            Generate Paper
          </Button>
        </form>
      </section>
    </main>
  );
};

export default QuestionPaperGenerator;
