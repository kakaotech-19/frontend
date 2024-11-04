"use client";

import store from "@/redux";
import { useMocking } from "@/domain/shared/hooks";
import { HR } from "flowbite-react";
import { Provider } from "react-redux";
import { Logo } from "@/domain/shared/components/layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useMocking();
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
