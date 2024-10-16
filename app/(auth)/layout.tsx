"use client";

import { Logo } from "@/components/Layout";
import store from "@/store";
import { HR } from "flowbite-react";
import { Provider } from "react-redux";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center my-10">
          <Logo />
          <HR />
          {children}
        </div>
      </div>
    </Provider>
  );
}
