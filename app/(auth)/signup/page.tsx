"use client";

import { useDispatch, useSelector } from "react-redux";
import { Button, HR, Label } from "flowbite-react";
import { resetSignupState } from "@/domain/auth/slices/signup/signupSlice";
import { registerUser } from "@/domain/auth/slices/signup/signupExtraReducers";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setIsIdLoginFormView } from "@/domain/auth/slices/login/loginSlice";
import path from "@/domain/shared/routes";
import { AlertType } from "@/domain/noti/types";
import { setAlert } from "@/domain/noti/slices/notiSlice";
import { SIGNUP_STEP } from "@/domain/auth/constants";
import { handleSwitchSignupStep } from "@/domain/auth/function";
import {
  AccountSection,
  PersonalSection,
  PolicySection,
  SignupStepper,
} from "@/domain/auth/components";
import { DirectionSVG } from "@/domain/shared/components/svg";
import { RootState } from "@/redux";

const Page = () => {
  const dispatch = useDispatch();
  const {
    email,
    nickname,
    signupId,
    password,
    verify,
    step: signupStep,
    reEnterPassword: reEnterPW,
    isSignup,
  } = useSelector((state: RootState) => state.signup);

  // 회원가입 성공시 유저 라우팅
  const router = useRouter();
  useEffect(() => {
    if (isSignup) {
      dispatch(
        setAlert({
          title: "알림",
          message: "회원가입이 완료되었습니다. 로그인해주세요.",
          color: "green",
        })
      );
      router.push(path.LOGIN);
      dispatch(resetSignupState());
      dispatch(setIsIdLoginFormView(true));
    }
  }, [isSignup]);

  // 회원가입
  const postSignup = () => {
    dispatch<any>(
      registerUser({
        email: email,
        nickname: nickname,
        loginId: signupId,
        password: password,
      })
    );
  };

  return (
    <form
      className="w-80 flex flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <Label
        onClick={() => router.push(path.LOGIN)}
        className="fixed flex top-4 left-4 items-center text-cyan-600 hover:underline dark:text-cyan-500 text-sm"
      >
        <DirectionSVG />
      </Label>
      <SignupStepper />
      <PersonalSection />
      <AccountSection />
      <PolicySection />
      <HR className="mt-0 mb-2" />
      <Button
        type="submit"
        onClick={() =>
          handleSwitchSignupStep({
            postSignup: postSignup,
            dispatch: dispatch,
            verify: verify,
            password: password,
            reEnterPassword: reEnterPW,
            signupStep: signupStep,
          })
        }
      >
        <p>{signupStep == SIGNUP_STEP.POLICY ? "회원가입 완료" : "다음"}</p>
      </Button>
    </form>
  );
};

export default Page;
