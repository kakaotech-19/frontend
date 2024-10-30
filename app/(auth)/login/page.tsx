"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/feature/redux";
import { LoginForm, OauthLoginGroup } from "@/components/auth";

const Page = () => {
  const isIdLoginFormView = useSelector(
    (state: RootState) => state.login.isIdLoginFormView
  );
  return (
    <>
      {!isIdLoginFormView ? (
        <>
          <OauthLoginGroup />
        </>
      ) : (
        <>
          <LoginForm />
        </>
      )}
    </>
  );
};

export default Page;
