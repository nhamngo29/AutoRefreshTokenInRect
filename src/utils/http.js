import axios from "axios";
import { toast } from "react-toastify";
import HttpStatusCode from "../constants/httpStatuscode.enum";
import config from "../constants/config";
import pathApi from "../constants/pathApi";
import {
  clearFormLS,
  getRefreshTokenFormLS,
  setAccessTokenToLS,
  setRefreshTokenToLS,
} from "./auth";
import { isAxiosExpiredRefreshTokenError, isAxiosUnauthorized } from "./utils";

class Http {
  constructor() {
    this.refreshToken = getRefreshTokenFormLS();
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
        //nếu sẽ ra lỗi thì sẽ vào đây
        const originalRequest = {
          ...error.config,
          _retry: error.config?._retry || false,
        };
        if (
          ![
            HttpStatusCode.UnprocessableEntity,
            HttpStatusCode.Conflict,
            HttpStatusCode.Unauthorized,
            HttpStatusCode.ExpiredRefreshToken,
          ].includes(error.response?.status)
        ) {
          //check này do tự cấu hình, còn nếu khác thì tùy vào status code mà xử lý
          const data = error.response?.data;
          const message = data?.Message || error.message;
          toast.error(message);
        }
        if (isAxiosUnauthorized(error) && !originalRequest._retry) {
          // Đánh dấu request này đã thử refresh token
          originalRequest._retry = true;

          // Refresh token nếu chưa có yêu cầu refresh đang được thực hiện
          this.refreshTokenRequest = this.refreshTokenRequest
            ? this.refreshTokenRequest
            : this.handleRefreshToken().finally(() => {
                setTimeout(() => {
                  this.refreshTokenRequest = null;
                }, 1000); //thời gian chờ để gọi lại request phải nhỏ hơn thời gian hết hạn của token
                //có theerr làm thêm api ở đây để lấy thời gian hết hạn
              });

          return this.refreshTokenRequest
            .then((newToken) => {
              // Cập nhật header Authorization với token mới
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
              }
              return this.instance(originalRequest); // Gọi lại request với token mới
            })
            .catch((refreshError) => {
              clearFormLS();
              this.refreshToken = "";
              return Promise.reject(refreshError);
            });
        } else if (isAxiosExpiredRefreshTokenError(error)) {
          this.refreshToken = "";
          clearFormLS();
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
        setRefreshTokenToLS(refreshToken);
        return (this.refreshToken = refreshToken);
      })
      .catch((error) => {
        clearFormLS();
        this.accessToken = "";
        this.refreshToken = "";
        throw error;
      });
  }
}

const http = new Http().instance;

export default http;
