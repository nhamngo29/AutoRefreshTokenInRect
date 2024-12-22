import axios from "axios";
import { toast } from "react-toastify";
import HttpStatusCode from "../constants/httpStatuscode.enum";
import config from "../constants/config";
import pathApi from "../constants/pathApi";
import { clearFormLS, setAccessTokenToLS, setRefreshTokenToLS } from "./auth";

class Http {
  constructor() {
    this.refreshToken = "";
    this.refreshTokenRequest = null;
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Đảm bảo rằng cookie được gửi đi kèm
    });

    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        if (this.refreshToken && config.headers) {
          config.withCredentials = true; // Gửi cookie đi kèm
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === pathApi.login || url === pathApi.register) {
          const data = response.data;
          this.refreshToken = data.response?.refreshToken || "";
          setRefreshTokenToLS(this.refreshToken);
          setAccessTokenToLS(data.response?.accessToken || "");
        } else if (url === pathApi.logout) {
          this.refreshToken = "";
          clearFormLS();
        }
        return response;
      },
      (error) => {
        console.log(error);
        //const originalRequest = error.config;

        if (
          ![
            HttpStatusCode.UnprocessableEntity,
            HttpStatusCode.Conflict,
            HttpStatusCode.Unauthorized,
            HttpStatusCode.ExpiredRefreshToken,
          ].includes(error.response?.status)
        ) {
          const data = error.response?.data;
          const message = data?.Message || error.message;
          toast.error(message);
        }

        return Promise.reject(error);
      }
    );
  }

  handleRefreshToken() {
    return this.instance
      .post(pathApi.refreshToken, {
        refreshToken: this.refreshToken,
      })
      .then((res) => {
        const refreshToken = res.data.response?.refreshToken || "";

        return (this.refreshToken = refreshToken);
      })
      .catch((error) => {
        this.refreshToken = "";
        throw error;
      });
  }
}

const http = new Http().instance;

export default http;
