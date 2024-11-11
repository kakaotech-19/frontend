"use client";

import store, { RootState } from "@/redux";
import { useMocking } from "@/domain/shared/hooks";
import { HR } from "flowbite-react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Logo, MyAlert } from "@/domain/shared/components/layout";
import { useEffect } from "react";
import { AlertType } from "@/domain/noti/types";
import { setAlert } from "@/domain/noti/slices/notiSlice";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  useMocking();

  const dispatch = useDispatch();
  const signupError = useSelector((state: RootState) => state.signup.error);
  const loginError = useSelector((state: RootState) => state.login.error);

  useEffect(() => {
    if (signupError || loginError) {
      const data: AlertType = {
        title: "알림",
        message: signupError || loginError,
        color: "red",
      };
      dispatch(setAlert(data));
    }
  }, [signupError, loginError]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-full flex flex-col items-center my-10">
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
      <Image
        width={500}
        height={500}
        src="/background.svg"
        alt="background"
        sizes="100vw"
        className="absolute top-0 w-full"
      />
      <Layout>{children}</Layout>
    </Provider>
  );
};

export default CustomProvider;
