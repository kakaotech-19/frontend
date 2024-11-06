"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { LoginForm, OauthLoginGroup } from "@/domain/auth/components";

const Page = () => {
  const isIdLoginFormView = useSelector(
    (state: RootState) => state.login.isIdLoginFormView
  );
  return (
    <div className="w-full flex justify-center">
      <div className="flex w-64 justify-center">
        {!isIdLoginFormView ? (
          <OauthLoginGroup />
        ) : (
          <>
            <LoginForm />
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
