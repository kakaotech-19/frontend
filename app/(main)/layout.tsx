"use client";

import store from "@/redux";
import { useMocking } from "@/domain/shared/hooks";
import React from "react";
import { Provider } from "react-redux";
import {
  AccessTokenReissue,
  BottomNavigation,
  HeaderNavigation,
} from "@/domain/shared/components/layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  useMocking();
  return (
    <>
      {/* Your component code here */}
      <AccessTokenReissue />
      <HeaderNavigation />
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
