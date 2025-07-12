import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: "",
    name: "",
    email: "",
  },
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addToUserId: (state, action) => {
      state.user.id = action.payload;
    },
    addToUserName: (state, action) => {
      state.user.name = action.payload;
    },
    addToUserEmail: (state, action) => {
      state.user.email = action.payload;
    },
    resetUser: (state) => {
      state.user = {};
    },
  },
});

export const { addToUserId, addToUserName, addToUserEmail, resetUser } =
  userSlice.actions;
export default userSlice.reducer;
