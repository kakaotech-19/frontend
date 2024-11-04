"use client";

import store from "@/redux";
import { useMocking } from "@/domain/shared/hooks";
import { HR } from "flowbite-react";
import { Provider } from "react-redux";
import { Logo, MyAlert } from "@/domain/shared/components/layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  useMocking();
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center my-10">
        <MyAlert />
        <Logo />
        <HR />
        {children}
      </div>
    </div>
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
