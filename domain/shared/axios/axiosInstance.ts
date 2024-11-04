import axios from "axios";
import store from "@/redux"; // store import 추가

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // 자격증명(리프레시 토큰)을 포함한 쿠키를 서버로 전달
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Axios 요청 전에 위치 정보를 추가하기 위한 인터셉터 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().login.accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    return response;
  },
  async (error) => {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    return Promise.reject(error);
  }
);

export default axiosInstance;
