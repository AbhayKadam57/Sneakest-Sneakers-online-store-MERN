import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "MyUser",
  initialState: {
    isFetching: false,
    currentUser: null,
    error: false,
  },

  reducers: {
    loginStarted: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logOut: (state) => {
      state.currentUser = null;
    },
  },
});

export const { loginStarted, loginSuccess, loginFailure, logOut } =
  userSlice.actions;

export default userSlice.reducer;
