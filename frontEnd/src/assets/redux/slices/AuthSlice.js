import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth: (state, action) => {
      return (state = action.payload);
    },
    removeAuth: (state, action) => {
      return null;
    },
  },
});

export const { addAuth, removeAuth } = AuthSlice.actions;
const AuthReducer = AuthSlice.reducer;

export default AuthReducer;
