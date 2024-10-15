"use client";

import Logo from "@/components/Layout/Logo";
import store from "@/store";
import { HR, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col items-center">
          <Logo />
          <HR />
          {children}
        </div>
      </div>
    </Provider>
  );
}
