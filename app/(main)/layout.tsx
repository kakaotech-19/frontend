"use client";

import store, { RootState } from "@/redux";
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

const Layout = ({ children }: { children: React.ReactNode }) => {
  useMocking();
  useEmptyTokenRedirect();
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
      <Layout>{children}</Layout>
    </Provider>
  );
};

export default CustomProvider;
