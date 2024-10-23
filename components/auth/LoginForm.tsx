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
import { useDispatch, useSelector } from "react-redux";
import { DirectionSVG } from "../svg";

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
        <DirectionSVG />
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
