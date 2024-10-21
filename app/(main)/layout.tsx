"use client";

import { BottomNavigation, HeaderNavigation } from "@/components/layout";
import store from "@/store";
import React from "react";
import { Provider } from "react-redux";

const layout = ({ children }: { children: React.ReactNode }) => {
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
