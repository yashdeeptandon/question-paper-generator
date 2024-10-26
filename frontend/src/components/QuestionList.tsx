import React, { useState, useEffect } from "react";
import "./QuestionList.css"; // Make sure to import your CSS file
import { BorderBeam } from "./magicui/border-beam";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { addQuestionToPaper } from "../api";
import { toast, ToastContainer } from "react-toastify";
import { ConfettiButton } from "./magicui/confetti";

const VALID_DIFFICULTY_MARKS = {
  Easy: 5,
  Medium: 10,
  Hard: 15,
};

const QuestionList = () => {
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [marks, setMarks] = useState("");

  // Update the marks based on the selected difficulty level
  useEffect(() => {
    if (difficulty) {
      setMarks(VALID_DIFFICULTY_MARKS[difficulty]); // Automatically set marks
    } else {
      setMarks(""); // Reset if no difficulty is selected
    }
  }, [difficulty]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation before sending data
    if (!question || !subject || !topic || !difficulty || !marks) {
      toast.error("Please fill out all fields correctly.");
      return;
    }

    const data = {
      question,
      subject,
      topic,
      difficulty,
      marks: parseInt(marks),
    };

    console.log(data);

    try {
      const response = await addQuestionToPaper(data);
      console.log("Response", response?.data);
      setQuestion("");
      setSubject("");
      setTopic("");
      setDifficulty("");
      setMarks("");
      toast.success("Question added successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.dismiss();
      toast.error(error?.message);
    }
  };

  return (
    <main className="w-full h-full flex flex-col">
      <ToastContainer />
      <p className="mt-[50px] w-full pointer-events-none bg-gradient-to-b from-black to-gray-300/80 dark:from-white dark:to-slate-900/10 bg-clip-text text-center text-4xl md:text-8xl font-semibold leading-none text-transparent">
        Add Question
      </p>

      <section className="w-full h-[90vh] flex justify-center mt-[30px] md:mt-[100px]">
        <form
          onSubmit={handleSubmit}
          className="relative w-[90%] md:w-[40%] min-w-[300px] md:min-w-[400px] h-[40%] md:h-[60%] min-h-[450px] gap-5 border rounded-xl shadow-lg"
        >
          <BorderBeam borderWidth={2} />

          <div className="w-full h-full p-5 flex flex-col gap-5 overflow-auto">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <Label htmlFor="question">Type Question:</Label>
              <Textarea
                className="w-full md:w-[600px]"
                id="question"
                name="question"
                rows={4}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              ></Textarea>
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <Label htmlFor="subject">Subject Related To:</Label>
              <Input
                className="w-full md:w-[200px]"
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <Label htmlFor="topic">Topic:</Label>
              <Input
                className="w-full md:w-[200px]"
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <Label htmlFor="difficulty">Difficulty Level:</Label>
              <Select
                name="difficulty"
                value={difficulty}
                onValueChange={(value) => setDifficulty(value)}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <Label htmlFor="marks">Marks:</Label>
              <Input
                className="w-full md:w-[200px]"
                type="text"
                id="marks"
                value={marks}
                disabled // Disable the field since it's autofilled
              />
            </div>

            <div className="flex flex-col md:flex-row justify-center">
              <ConfettiButton type="submit">Submit</ConfettiButton>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default QuestionList;
