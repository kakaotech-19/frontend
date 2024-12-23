"use client";

import store, { RootState } from "@/domain/shared/redux";
import {
  useEmptyTokenRedirect,
  useLoginChecker,
  useMocking,
} from "@/domain/shared/hooks";
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
  useEmptyTokenRedirect();
  useLoginChecker();
  const dispatch = useDispatch();
  const { lastResponse, error: sseError } = useSSE();

  const loginError = useSelector((state: RootState) => state.login.error);
  useEffect(() => {
    if (loginError) {
      dispatch(
        setAlert({
          title: "알림",
          message: loginError,
          color: "red",
        }),
      );
    }
  }, [loginError]);

  // SSE 응답 처리
  useEffect(() => {
    if (lastResponse) {
      dispatch(
        setAlert({
          title: "새 알림",
          message: lastResponse.message,
          color: "info",
        }),
      );
    }
  }, [lastResponse, dispatch]);

  // SSE 에러 처리
  useEffect(() => {
    if (sseError) {
      dispatch(
        setAlert({
          title: "알림 오류",
          message: sseError.message,
          color: "failure",
        }),
      );
    }
  }, [sseError, dispatch]);

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
      <SSEProvider>
        <Layout>{children}</Layout>
      </SSEProvider>
    </Provider>
  );
};

export default CustomProvider;
