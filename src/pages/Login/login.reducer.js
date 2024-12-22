import { createAction, createReducer } from "@reduxjs/toolkit";
import { getProfilefromLS, getRefreshTokenFormLS } from "../../utils/auth";
const initialState = {
  isAuthenticated: Boolean(getRefreshTokenFormLS()),
  setIsAuthenticated: () => null,
  profile: getProfilefromLS(),
  setProfile: () => null,
  reset: () => null,
};
export const setIsAuthenticated = createAction("login/setIsAuthenticated");
const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setIsAuthenticated, (state, action) => {
      state.isAuthenticated = action.payload;
    })
    .addCase("SET_PROFILE", (state, action) => {
      state.profile = action.payload;
    })
    .addCase("RESET", (state) => {
      state.isAuthenticated = false;
      state.profile = null;
    });
});
export default loginReducer;
