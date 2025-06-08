import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};
const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state, action) => {
      const isMovieSearched = state.movies.some(
        (movie) => movie === action.payload,
      );

      if (!isMovieSearched) {
        state.movies.push(action.payload);
      }
    },
    resetHistory: (state, action) => {
      state.movies = [];
    },
  },
});

export const { addToHistory, resetHistory } = historySlice.actions;
export default historySlice.reducer;
