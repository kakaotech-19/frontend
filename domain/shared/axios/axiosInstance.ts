import axios from "axios";
import { apiVersion, url } from "@/app/globals";
import path from "../routes";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: url + apiVersion,
  withCredentials: true, // 자격증명(리프레시 토큰)을 포함한 쿠키를 서버로 전달
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Axios 요청 전에 위치 정보를 추가하기 위한 인터셉터 추가
axiosInstance.interceptors.request.use(
  (config) => {
    // 서버사이드에서는 localStorage에 접근할 수 없으므로 반환
    if (typeof window === "undefined") {
      return config;
    }
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;
    if (response && response.status === 401 && !config._retry) {
      try {
        // 토큰 재발급 요청
        const refreshTokenResponse = await axios.post(
          url + apiVersion + "/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        // 새 액세스 토큰 설정
        const newAccessToken = refreshTokenResponse.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        config.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // 이전 요청 재시도
        return axiosInstance(config);
      } catch (refreshError) {
        window.location.href = path.LOGIN;
        alert("로그인이 필요한 서비스입니다.");
        localStorage.removeItem("accessToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
