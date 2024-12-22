import axios from "axios";
import HttpStatusCode from "../constants/httpStatuscode.enum";

export function isAxiosError(error) {
  return axios.isAxiosError(error);
}
export function isAxiosExpiredRefreshTokenError(error) {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.ExpiredRefreshToken
  );
}
export function isAxiosUnauthorized(error) {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.Unauthorized
  );
}
