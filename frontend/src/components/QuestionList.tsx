import React, { useState } from "react";
import "./QuestionList.css"; // Make sure to import your CSS file
import { BorderBeam } from "./magicui/border-beam";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const QuestionList = () => {
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [marks, setMarks] = useState("");

  const baseURL = "https://question-paper-generator-okl0.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      question,
      subject,
      topic,
      difficulty,
      marks: parseInt(marks),
    };

    console.log(data);

    try {
      const response = await fetch(`${baseURL}/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle success, maybe show a success message or reset the form
        console.log("Question added successfully!");
        setQuestion("");
        setSubject("");
        setTopic("");
        setDifficulty("");
        setMarks("");
      } else {
        // Handle error
        console.error("Failed to add question");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="w-full h-full flex flex-col">
      <p className="mt-[50px] pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Add Question
      </p>
      <section className="w-full h-full flex justify-center mt-[100px]">
        <form
          onSubmit={handleSubmit}
          className="relative w-[40%] min-w-[400px] h-[60%] min-h-[450px] gap-5 border rounded-xl shadow-lg justify-between"
        >
          <BorderBeam borderWidth={2} />
          <div className="w-full h-full p-5 flex flex-col gap-2 justify-between overflow-auto">
            <div className="flex flex-row gap-2 items-center">
              <Label htmlFor="question">Type Question:</Label>
              <Textarea
                className="w-[600px]"
                id="question"
                name="question"
                rows={4}
                cols={50}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              ></Textarea>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Label htmlFor="subject">Subject Related To:</Label>
              <Input
                className="w-[200px]"
                type="text"
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Label htmlFor="topic">Topic:</Label>
              <Input
                className="w-[200px]"
                type="text"
                id="topic"
                name="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Label htmlFor="difficulty">Difficulty Level:</Label>
              <Select
                name="difficulty"
                value={difficulty}
                onValueChange={(value) => setDifficulty(value)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Label htmlFor="marks">Marks:</Label>
              <Input
                className="w-[200px]"
                type="text"
                id="marks"
                name="marks"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
              />
            </div>

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default QuestionList;
