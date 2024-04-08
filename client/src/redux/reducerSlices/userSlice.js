// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: "",
  userDetails: {},
  isLoggedIn: false,
  avatar: ""
};

//Redux Toolkit slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, actions) => {
      // actions.payload has arguments
      return {
        ...state,
        token: actions.payload.token,
        userDetails: actions.payload.userDetails,
        isLoggedIn: true,
      };
    },
    logoutUser: (state, actions) => {
      return { ...initialState };
    },
  },
});
export const { loginUser, logoutUser } = userSlice.actions;
// more code...
export default userSlice.reducer;
