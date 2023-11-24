import axios from "axios";

const baseURL = "https://question-paper-generator-tbxz.onrender.com"; // Your backend URL
const frontBaseURL = "https://question-paper-generator-seven.vercel.app";

const api = axios.create({
  baseURL,
});

const frontApi = axios.create({
  frontBaseURL,
});

// Function to get all questions from the backend
export const getQuestions = async () => {
  try {
    const response = await api.get("/api/questions");
    return response;
  } catch (error) {
    throw new Error("Failed to fetch questions: " + error.message);
  }
};

// Function to create a new question
export const createQuestion = async (questionData) => {
  try {
    const response = await api.post("/api/questions", questionData);
    return response;
  } catch (error) {
    throw new Error("Failed to create question: " + error.message);
  }
};

// Function to generate a question paper based on criteria
export const generateQuestionPaper = async (paperData) => {
  try {
    const response = await frontApi.post("/generate-paper", paperData);
    return response;
  } catch (error) {
    throw new Error("Failed to generate question paper: " + error.message);
  }
};

export default api;
