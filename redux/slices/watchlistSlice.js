import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unwatchedRuntime: 0,
  averageScore: 0,
  totalScore: 0,
  movieCount: 0,
  movies: [], 
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addMovieRx: (state, action) => {

      const existingMovie = state.movies.find(movie => movie.id === action.payload.id);
      if (!existingMovie) {
        state.unwatchedRuntime += action.payload.runtime;
        state.movieCount += 1;
        state.totalScore += Number(action.payload.vote_average.toFixed(2));
        state.averageScore = state.movieCount > 0 ? (state.totalScore / state.movieCount).toFixed(2) : 0;
        state.movies.push(action.payload);
      }
    },
    deleteMovieRx: (state, action) => {
      const movieIndex = state.movies.findIndex(movie => movie.id === action.payload.id);
      if (movieIndex !== -1) {
        console.log("delete triger")

        state.unwatchedRuntime -= action.payload.runtime;
        state.movieCount -= 1;
        state.totalScore -= Number(action.payload.vote_average.toFixed(2));
        state.averageScore = state.movieCount > 0 ? (state.totalScore / state.movieCount).toFixed(2) : 0;
        state.movies.splice(movieIndex, 1);
        console.log(state.unwatchedRuntime)
      }
    },
    infoReset: (state) => {
      state.unwatchedRuntime = 0;
      state.averageScore = 0;
      state.totalScore = 0;
      state.movieCount = 0;
      state.movies = [];
    },
  },
});

export const {
  addMovieRx,
  deleteMovieRx,
  infoReset,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;