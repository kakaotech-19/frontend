"use client";

import { RedirectSVG } from "@/domain/shared/components/svg";
import { RootState } from "@/redux";
import React from "react";
import { useSelector } from "react-redux";
import { SIGNUP_STEP } from "../../constants";

const SignupStepper: React.FC = () => {
  const signupStep = useSelector((state: RootState) => state.signup.step);
  return (
    <ol className="flex justify-center items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 dark:border-gray-700">
      <li
        className={`flex items-center ${
          signupStep >= SIGNUP_STEP.PERSONAL
            ? "text-cyan-600 dark:text-cyan-500"
            : ""
        }`}
      >
        <span
          className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${
            signupStep >= SIGNUP_STEP.PERSONAL
              ? "border-cyan-600 rounded-full shrink-0 dark:border-cyan-500"
              : " border-gray-500 rounded-full shrink-0 dark:border-gray-400"
          }`}
        >
          1
        </span>
        이메일
        <RedirectSVG />
      </li>
      <li
        className={`flex items-center ${
          signupStep >= SIGNUP_STEP.ACCOUNT
            ? "text-cyan-600 dark:text-cyan-500"
            : ""
        }`}
      >
        <span
          className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${
            signupStep >= SIGNUP_STEP.ACCOUNT
              ? "border-cyan-600 rounded-full shrink-0 dark:border-cyan-500"
              : " border-gray-500 rounded-full shrink-0 dark:border-gray-400"
          }`}
        >
          2
        </span>
        계정
        <RedirectSVG />
      </li>
      <li
        className={`flex items-center ${
          signupStep >= SIGNUP_STEP.POLICY
            ? "text-cyan-600 dark:text-cyan-500"
            : ""
        }`}
      >
        <span
          className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${
            signupStep >= SIGNUP_STEP.POLICY
              ? "border-cyan-600 rounded-full shrink-0 dark:border-cyan-500"
              : " border-gray-500 rounded-full shrink-0 dark:border-gray-400"
          }`}
        >
          3
        </span>
        약관동의
      </li>
    </ol>
  );
};

export default SignupStepper;
