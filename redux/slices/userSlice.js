import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: "aab39d10-4db1-483b-8cad-2cdb8676154a",
    email: null,
  },
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addToUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = {};
    },
  },
});

export const { addToUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
