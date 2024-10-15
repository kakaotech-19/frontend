"use client";

import { RootState } from "@/store";
import { setLoginId, setLoginPassword } from "@/store/slices/login/loginSlice";
import { Button, HR, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const loginId = useSelector((state: RootState) => state.login.loginId);
  const password = useSelector((state: RootState) => state.login.password);

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-80 h-80">
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
              onInput={(e) => dispatch(setLoginPassword(e.currentTarget.value))}
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
  );
};

export default Page;
