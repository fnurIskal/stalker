import { configureStore } from "@reduxjs/toolkit";
import moodReducer from "./slices/MoodSlice";

export const store = configureStore({
  reducer: {
    mood: moodReducer,
  },
});
