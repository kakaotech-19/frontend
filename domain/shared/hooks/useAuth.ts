import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { JWT_ROLE } from "../constants";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import path from "../routes";
import { AlertType } from "@/domain/noti/types";
import { setAlert } from "@/domain/noti/slices/notiSlice";
import { reissueToken } from "@/domain/auth/slices/login/loginExtraReducers";

export const useEmptyTokenRedirect = () => {
  const token = localStorage.getItem("accessToken");
  const router = useRouter();
  const dispatch = useDispatch();
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
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      dispatch<any>(reissueToken());
    }
  }, []);
};
