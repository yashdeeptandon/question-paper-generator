import axios from "axios";

const baseURL = "https://question-paper-generator-tbxz.onrender.com/api"; // Your backend URL

const api = axios.create({
  baseURL,
});

// Function to get all questions from the backend
export const getQuestions = async () => {
  try {
    const response = await api.get("/questions");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch questions: " + error.message);
  }
};

// Function to create a new question
export const createQuestion = async (questionData) => {
  try {
    const response = await api.post("/questions", questionData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create question: " + error.message);
  }
};

// Function to generate a question paper based on criteria
export const generateQuestionPaper = async (paperData) => {
  try {
    const response = await api.post("/generate-paper", paperData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to generate question paper: " + error.message);
  }
};

export default api;
