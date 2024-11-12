import { reissueToken } from "@/domain/auth/slices/login/loginExtraReducers";
import axios from "axios";

// 순환참조 제거
let storeRef: any;
export const setAxiosInnerStore = (store: any) => {
  storeRef = store;
};

export const url = "https://todaktodak.site";
// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: url + "/api/v1",
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
      config._retry = true;
      try {
        storeRef?.dispatch(reissueToken());
        // 토큰 재발급 후 원래 요청 재시도
        return axiosInstance(config);
      } catch (err) {
        // 재발급 실패 시 로그인 페이지로 리디렉션 등 처리
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
