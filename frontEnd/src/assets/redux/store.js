import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
