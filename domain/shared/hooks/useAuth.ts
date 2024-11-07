import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import path from "../routes";
import { AlertType } from "@/domain/noti/types";
import { setAlert } from "@/domain/noti/slices/notiSlice";
import { reissueToken } from "@/domain/auth/slices/login/loginExtraReducers";

export const useEmptyTokenRedirect = () => {
  // 서버사이드에서는 localStorage에 접근할 수 없으므로 반환
  if (typeof window === "undefined") {
    return;
  }
  const router = useRouter();
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (!token) {
      const data: AlertType = {
        title: "알림",
        message: "로그인이 필요한 서비스입니다.",
        color: "red",
      };
      dispatch(setAlert(data));
      router.push(path.LOGIN);
    }
  }, [token, dispatch]);
};

export const useReissueToken = () => {
  const dispatch = useDispatch();
  // 서버사이드에서는 localStorage에 접근할 수 없으므로 반환
  if (typeof window === "undefined") {
    return;
  }
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      dispatch<any>(reissueToken());
    }
  }, []);
};
