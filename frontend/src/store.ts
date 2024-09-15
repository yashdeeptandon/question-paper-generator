import { configureStore } from "@reduxjs/toolkit";
// Import your reducers here
// import exampleReducer from './features/exampleSlice';

export const store = configureStore({
  reducer: {
    // example: exampleReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
