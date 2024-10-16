"use client";

import { RootState } from "@/store";
import {
  setIsEmailFormView,
  setLoginId,
  setLoginPassword,
} from "@/store/slices/login/loginSlice";
import { Label, TextInput, Button, HR } from "flowbite-react";
import Link from "next/link";
import React from "react";
import { Root } from "react-dom/client";
import { useDispatch, useSelector } from "react-redux";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const loginId = useSelector((state: RootState) => state.login.loginId);
  const password = useSelector((state: RootState) => state.login.password);

  return (
    <>
      <Label
        onClick={() => dispatch(setIsEmailFormView(false))}
        className="fixed flex top-4 left-4 items-center text-cyan-600 hover:underline dark:text-cyan-500 text-sm"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m15 19-7-7 7-7"
          />
        </svg>
        All sign in options
      </Label>
      <div className="flex justify-center h-full items-center">
        <div className="w-80">
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="login-id" value="Login ID" />
              </div>
              <TextInput
                id="login-id"
                type="text"
                value={loginId}
                onInput={(e) => dispatch(setLoginId(e.currentTarget.value))}
                placeholder=""
                required
              />
            </div>
            <div className="mb-2">
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Password" />
              </div>
              <TextInput
                id="password1"
                type="password"
                value={password}
                onInput={(e) =>
                  dispatch(setLoginPassword(e.currentTarget.value))
                }
                required
              />
              <Label
                htmlFor="forgot-password"
                className="text-cyan-600 hover:underline dark:text-cyan-500 text-sm"
                onClick={() => {}}
              >
                forgot password?
              </Label>
            </div>
            <Button type="submit">Login</Button>
            <HR className="mb-0" />
            <Label htmlFor="signup-link" className="flex">
              Don't have an account?&nbsp;
              <Link
                href="/signup"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Create Account
              </Link>
            </Label>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
