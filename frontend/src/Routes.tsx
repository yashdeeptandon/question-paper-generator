import React from "react";
import { Routes, Route } from "react-router-dom";
import QuestionPaperGenerator from "./components/QuestionPaperGenerator";
import QuestionList from "./components/QuestionList";
import MainScreen from "./pages";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/generate-paper" element={<QuestionPaperGenerator />} />
      <Route path="/add-questions" element={<QuestionList />} />
    </Routes>
  );
};

export default AppRoutes;