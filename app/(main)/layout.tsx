"use client";

import store from "@/redux";
import { useMocking } from "@/domain/shared/hooks";
import React from "react";
import { Provider } from "react-redux";
import {
  BottomNavigation,
  HeaderNavigation,
} from "@/domain/shared/components/layout";

const layout = ({ children }: { children: React.ReactNode }) => {
  useMocking();
  return (
    <Provider store={store}>
      {/* Your component code here */}
      <HeaderNavigation />
      {children}
      <BottomNavigation />
    </Provider>
  );
};

export default layout;
