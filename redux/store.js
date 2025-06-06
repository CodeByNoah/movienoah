import { configureStore } from "@reduxjs/toolkit";
import watchlistSlice from "./slices/watchlistSlice.js";
// import historySlice from "./slices/historySlice.js";
// import userSlice from "./slices/userSlice.js";

export const store = configureStore({
  reducer: {
    watchlistStore: watchlistSlice,
    // historyStore: historySlice,
    // userStore: userSlice,
  },
});
