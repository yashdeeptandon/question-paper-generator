import axios from "axios";
import { toast } from "react-toastify";

const baseURL = `${import.meta.env.VITE_BASE_URL}/api`; // Your backend URL

// Function to get all questions from the backend
export const getQuestions = async () => {
  try {
    const response = await axios.get(`${baseURL}/questions`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch questions: " + error.message);
  }
};

// Function to create a new question
export const createQuestion = async (questionData) => {
  try {
    const response = await axios.post(`${baseURL}/questions`, questionData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create question: " + error.message);
  }
};

// Function to generate a question paper based on criteria
export const generateQuestionPaper = async (paperData) => {
  try {
    const response = await axios.post(`${baseURL}/generate-paper`, paperData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to generate question paper: " + error.message);
  }
};

export const addQuestionToPaper = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/questions`, data);
    console.log("Response", response);

    if (response?.status === 201) {
      // Handle success, maybe show a success message or reset the form
      toast.dismiss();
      toast.success("Question added successfully!");
      return response?.data;
    } else {
      // Handle error
      console.error("Failed to add question");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
