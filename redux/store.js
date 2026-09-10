import { configureStore } from "@reduxjs/toolkit";
import watchlistSlice from "./slices/watchlistSlice.js";
import userSlice from "@/redux/slices/userSlice";
import historySlice from "@/redux/slices/historySlice";
import uiSlice from "@/redux/slices/uiSlice";

export const store = configureStore({
  reducer: {
    watchlistStore: watchlistSlice,
    historyStore: historySlice,
    userStore: userSlice,
    uiStore: uiSlice,
  },
});
