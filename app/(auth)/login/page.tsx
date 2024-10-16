"use client";

import KakaoLoginButton from "@/components/Auth/KakaoLoginButton";
import GoogleLoginButton from "@/components/Auth/GoogleLoginButton";
import { Button, FooterDivider, Label } from "flowbite-react";
import { useState } from "react";
import LoginForm from "./LoginForm";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setIsEmailFormView } from "@/store/slices/login/loginSlice";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isEmailFormView = useSelector(
    (state: RootState) => state.login.isEmailFormView
  );
  return (
    <>
      {isEmailFormView ? (
        <LoginForm />
      ) : (
        <>
          <KakaoLoginButton onClick={() => {}} />
          <br />
          <GoogleLoginButton onClick={() => {}} />
          <br />
          <Label className="text-sm text-gray-500">or</Label>
          <FooterDivider className="mt-4" />
          <Button
            className="w-full"
            onClick={() => dispatch(setIsEmailFormView(true))}
          >
            Sign in with ID
          </Button>
          <br />
          <Button
            className="w-full bg-white border border-gray-300 text-cyan-600"
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
