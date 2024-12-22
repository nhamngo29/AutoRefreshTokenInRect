import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./pages/Login/login.reducer";
export const store = configureStore({
  reducer: { login: loginReducer },
});
