"use client";

import { setAlert } from "@/domain/noti/slices/notiSlice";
import { AlertType } from "@/domain/noti/types";
import { RootState } from "@/redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dipsatch = useDispatch();
  const error = useSelector((state: RootState) => state.diary.error);
  const feedError = useSelector((state: RootState) => state.feed.error);
  useEffect(() => {
    if (error || feedError) {
      const data: AlertType = {
        title: "오류",
        message: error || feedError || "Unknown error",
        color: "red",
      };
      dipsatch(setAlert(data));
    }
  }, [error, feedError]);

  return <>{children}</>;
};

export default Layout;
