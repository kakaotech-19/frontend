"use client";

import { setAlert } from "@/domain/noti/slices/notiSlice";
import { AlertType } from "@/domain/noti/types";
import { RootState } from "@/domain/shared/redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const memberError = useSelector((state: RootState) => state.member.error);
  useEffect(() => {
    if (memberError) {
      const data: AlertType = {
        title: "알림",
        message: memberError,
        color: "red",
      };
      dispatch(setAlert(data));
    }
  }, [memberError]);
  return <>{children}</>;
};

export default Layout;
