"use client";

import { Button, HR } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setIsEmailFormView } from "@/store/slices/login/loginSlice";
import {
  GoogleLoginButton,
  KakaoLoginButton,
  LoginForm,
} from "@/components/Auth";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isEmailFormView = useSelector(
    (state: RootState) => state.login.isEmailFormView
  );
  return (
    <>
      {isEmailFormView ? (
        <>
          <LoginForm />
        </>
      ) : (
        <>
          <KakaoLoginButton onClick={() => {}} />
          <br />
          <GoogleLoginButton onClick={() => {}} />
          <div className="inline-flex items-center justify-center w-full">
            <HR className="w-60 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute px-3 font-sm text-gray-400 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
              or
            </span>
          </div>
          <Button
            className="w-full"
            onClick={() => dispatch(setIsEmailFormView(true))}
          >
            Sign in with ID
          </Button>
          <br />
          <Button
            className="w-full bg-white border border-gray-300 text-cyan-600 hover:text-white"
            onClick={() => router.push("/signup")}
          >
            Create Account
          </Button>
        </>
      )}
    </>
  );
};

export default Page;
