import React, { useState } from "react";
import "./QuestionList.css"; // Make sure to import your CSS file

const QuestionList = () => {
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [marks, setMarks] = useState("");

  const baseURL = "https://question-paper-generator-tbxz.onrender.com";

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
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Type Question:</label>
        <textarea
          id="question"
          name="question"
          rows="4"
          cols="50"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>

        <label htmlFor="subject">Subject Related To:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <label htmlFor="topic">Topic:</label>
        <input
          type="text"
          id="topic"
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <label htmlFor="difficulty">Difficulty Level:</label>
        <select
          id="difficulty"
          name="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="" disabled>
            Select difficulty
          </option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <label htmlFor="marks">Marks:</label>
        <input
          type="number"
          id="marks"
          name="marks"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default QuestionList;
