import { createSlice } from "@reduxjs/toolkit";
import { AllEmojis } from "../../data/DefaultImages";
export const moodSlice = createSlice({
  name: "mood",
  initialState: {
    value: AllEmojis[0],
  },
  reducers: {
    changeMood: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeMood } = moodSlice.actions;

export default moodSlice.reducer;
