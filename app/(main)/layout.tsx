"use client";

import store, { RootState } from "@/redux";
import { useMocking } from "@/domain/shared/hooks";
import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  BottomNavigation,
  HeaderNavigation,
  MyAlert,
} from "@/domain/shared/components/layout";
import { reissueToken } from "@/domain/auth/slices/login/loginExtraReducers";
import { setAlert } from "@/domain/noti/slices/notiSlice";
import { AlertType } from "@/domain/noti/types";

const Layout = ({ children }: { children: React.ReactNode }) => {
  useMocking();

  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      dispatch<any>(reissueToken());
    }
  }, []);

  const loginError = useSelector((state: RootState) => state.login.error);
  useEffect(() => {
    if (loginError) {
      const data: AlertType = {
        title: "알림",
        message: loginError,
        color: "red",
      };
      dispatch(setAlert(data));
    }
  }, [loginError]);

  return (
    <>
      <HeaderNavigation />
      <MyAlert />
      {children}
      <BottomNavigation />
    </>
  );
};

const CustomProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Layout>{children}</Layout>
    </Provider>
  );
};

export default CustomProvider;
