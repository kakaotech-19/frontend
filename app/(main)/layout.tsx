"use client";

import store, { RootState } from "@/redux";
import {
  useEmptyTokenRedirect,
  useMocking,
  useReissueToken,
} from "@/domain/shared/hooks";
import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  BottomNavigation,
  HeaderNavigation,
  MyAlert,
} from "@/domain/shared/components/layout";
import { setAlert } from "@/domain/noti/slices/notiSlice";
import { AlertType } from "@/domain/noti/types";
import { useServerSentEvent } from "@/domain/noti/hooks";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // hooks
  useMocking();
  useReissueToken();
  useEmptyTokenRedirect();
  useServerSentEvent();

  const dispatch = useDispatch();

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
