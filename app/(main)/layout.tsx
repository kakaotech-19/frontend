"use client";

import store, { RootState } from "@/domain/shared/redux";
import { useLoginChecker, useMocking } from "@/domain/shared/hooks";
import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  BottomNavigation,
  HeaderNavigation,
  MyAlert,
} from "@/domain/shared/components/layout";
import { setAlert } from "@/domain/noti/slices/notiSlice";
import { SSEProvider, useSSE } from "@/domain/sse/sse";

const Layout = ({ children }: { children: React.ReactNode }) => {
  useMocking();
  useLoginChecker();
  const dispatch = useDispatch();

  const loginError = useSelector((state: RootState) => state.login.error);
  useEffect(() => {
    if (loginError) {
      dispatch(
        setAlert({
          title: "알림",
          message: loginError,
          color: "red",
        })
      );
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
      {/* <SSEProvider> */}
      <Layout>{children}</Layout>
      {/* </SSEProvider> */}
    </Provider>
  );
};

export default CustomProvider;
