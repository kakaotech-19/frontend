"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { LoginForm, OauthLoginGroup } from "@/domain/auth/components";

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
