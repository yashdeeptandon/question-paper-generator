import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { revertAll } from "../ResetRedux/RevertAll";

interface QuestionsProperties {
  difficulty: string;
  marks: number;
  question: string;
  subject: string;
  topic: string;
}
interface InitialStateProperties {
  Questions: QuestionsProperties[];
}

const initialState: InitialStateProperties = {
  Questions: [],
};

const QuestionsSlice = createSlice({
  name: "GeneratedQuestions",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    toInitialState(state) {
      state.Questions = [];
    },

    setQuestions(state, action: PayloadAction<QuestionsProperties[]>) {
      state.Questions = action.payload;
    },
  },
});

export const QuestionsSliceActions = QuestionsSlice.actions;
export default QuestionsSlice;
