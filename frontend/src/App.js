import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import QuestionPaperGenerator from "./components/QuestionPaperGenerator";
import QuestionList from "./components/QuestionList";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <h1>Question Paper Generator App</h1>
        <div className="buttons-container">
          <Link to="/generate-paper" className="button">
            Generate Question Paper
          </Link>
          <Link to="/add-questions" className="button">
            Add Questions
          </Link>
        </div>
        <Routes>
          <Route path="/generate-paper" element={<QuestionPaperGenerator />} />
          <Route path="/add-questions" element={<QuestionList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
