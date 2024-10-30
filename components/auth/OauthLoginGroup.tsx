"use client";

import React from "react";
import KakaoLoginButton from "./KakaoLoginButton";
import GoogleLoginButton from "./GoogleLoginButton";
import { Button, HR } from "flowbite-react";
import { useDispatch } from "react-redux";
import { setIsIdLoginFormView } from "@/feature/redux/slices/login/loginSlice";
import { useRouter } from "next/navigation";
import path from "@/feature/routes";

const OauthLoginGroup: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
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
        onClick={() => dispatch(setIsIdLoginFormView(true))}
      >
        Sign in with ID
      </Button>
      <br />
      <Button
        className="w-full bg-white border border-gray-300 text-cyan-600 hover:text-white"
        onClick={() => router.push(path.SIGNUP)}
      >
        Create Account
      </Button>
    </>
  );
};

export default OauthLoginGroup;
