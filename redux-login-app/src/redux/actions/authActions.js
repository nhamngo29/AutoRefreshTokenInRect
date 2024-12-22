import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../types';

// Action creator for successful login
export const loginUser = (userData) => {
  return (dispatch) => {
    // Simulate an API call
    setTimeout(() => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: userData,
      });
    }, 1000);
  };
};

// Action creator for failed login
export const loginError = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

// Action creator for logout
export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};