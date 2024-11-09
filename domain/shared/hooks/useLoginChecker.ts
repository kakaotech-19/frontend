import { setAlert } from "@/domain/noti/slices/notiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useLoginChecker = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const lastLogin = localStorage.getItem("lastLogin");
    const today = new Date().toDateString();

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return;
    }

    if (lastLogin !== today) {
      localStorage.setItem("lastLogin", today);
      dispatch(
        setAlert({
          title: "알림",
          message: `로그인 일시: ${new Date().toLocaleString()}`,
          color: "success",
        })
      );
    }
  }, []);
};

export default useLoginChecker;
