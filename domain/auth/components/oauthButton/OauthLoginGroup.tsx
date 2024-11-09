"use client";

import React, { useEffect } from "react";
import { Button, HR } from "flowbite-react";
import { useDispatch } from "react-redux";
import { setIsIdLoginFormView } from "@/domain/auth/slices/login/loginSlice";
import { useRouter } from "next/navigation";
import path from "@/domain/shared/routes";
import { GoogleLoginButton, KakaoLoginButton, NaverLoginButton } from "..";

const OauthLoginGroup: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const url = "http://localhost:8080";

  const handleOAuthClick = (provider: string) => {
    if (!url) {
      console.error("API URL is not configured");
      return;
    }
    const authUrl = url + provider;
    window.location.href = authUrl;
  };

  return (
    <div className="w-80">
      <div className="space-y-4 max-w-96">
        <KakaoLoginButton onClick={() => handleOAuthClick(path.KAKAO)} />
        <br />
        <GoogleLoginButton onClick={() => handleOAuthClick(path.GOOGLE)} />
        <br />
        <NaverLoginButton onClick={() => handleOAuthClick(path.NAVER)} />
      </div>
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
        아이디로 로그인하기
      </Button>
      <br />
      <Button
        className="w-full bg-white border border-gray-300 text-cyan-600 hover:text-white"
        onClick={() => router.push(path.SIGNUP)}
      >
        회원가입
      </Button>
    </div>
  );
};

export default OauthLoginGroup;
