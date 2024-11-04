"use client";

import React from "react";
import KakaoLoginButton from "./KakaoLoginButton";
import GoogleLoginButton from "./GoogleLoginButton";
import { Button, HR } from "flowbite-react";
import { useDispatch } from "react-redux";
import { setIsIdLoginFormView } from "@/domain/auth/slices/login/loginSlice";
import { useRouter } from "next/navigation";
import path from "@/routes";
import NaverLoginButton from "./NaverLoginButton";
import Link from "next/link";

const OauthLoginGroup: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_API_URL;
  return (
    <>
      <Link href={`${url}${path.KAKAO}`} passHref>
        <KakaoLoginButton />
      </Link>
      <br />
      <Link href={`${url}${path.GOOGLE}`} passHref>
        <GoogleLoginButton />
      </Link>
      <br />
      <Link href={`${url}${path.NAVER}`} passHref>
        <NaverLoginButton />
      </Link>
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
        Log in with ID
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
