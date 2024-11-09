"use client";

import { RootState } from "@/redux";
import {
  resetLoginState,
  setIsIdLoginFormView,
  setLoginId,
  setLoginPassword,
} from "@/domain/auth/slices/login/loginSlice";
import { Label, TextInput, Button, HR } from "flowbite-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/domain/auth/slices/login/loginExtraReducers";
import { useRouter } from "next/navigation";
import path from "@/domain/shared/routes";
import { DirectionSVG } from "@/domain/shared/components/svg";
import { LoginUserType } from "../dto/request";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const loginId = useSelector((state: RootState) => state.login.loginId);
  const password = useSelector((state: RootState) => state.login.password);

  // 로그인 성공 시 유저 라우팅
  const router = useRouter();
  const isLogin = useSelector((state: RootState) => state.login.isLogin);
  useEffect(() => {
    if (isLogin) {
      router.push(path.HOME);
      dispatch(resetLoginState());
    }
  }, [isLogin]);

  // 로그인
  const handleLogin = () => {
    const data: LoginUserType = {
      loginId: loginId.trim(),
      password: password.trim(),
    };
    dispatch<any>(loginUser(data));
  };

  return (
    <>
      <Label
        onClick={() => dispatch(setIsIdLoginFormView(false))}
        className="fixed flex top-4 left-4 items-center text-gray-200 hover:underline text-sm"
      >
        <DirectionSVG />
        소셜 로그인하기
      </Label>
      <div className="flex justify-center h-full items-center">
        <div className="w-80">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="login-id" value="로그인 아이디" />
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
                <Label htmlFor="password1" value="비밀번호" />
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
                비밀번호를 잊으셨나요?
              </Label>
            </div>
            <Button type="submit" onClick={handleLogin}>
              로그인
            </Button>
            <HR className="mb-0" />
            <Label htmlFor="signup-link" className="flex">
              아직 계정이 없으신가요?&nbsp;
              <Link
                href="/signup"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                계정 만들기
              </Link>
            </Label>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
