"use client";

import { RootState } from "@/domain/shared/redux";
import { Button, Label, TextInput } from "flowbite-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmEmailCode,
  verifyEmail,
} from "../../slices/signup/signupExtraReducers";
import { SIGNUP_STEP } from "../../constants";
import {
  setIsEmailVerified,
  setIsOtpVerified,
  setOTP,
  setSignupEmail,
} from "../../slices/signup/signupSlice";
import { setAlert } from "@/domain/noti/slices/notiSlice";

const PersonalSection: React.FC = () => {
  const dispatch = useDispatch();

  const signupStep = useSelector((state: RootState) => state.signup.step);
  const email = useSelector((state: RootState) => state.signup.email);
  const otp = useSelector((state: RootState) => state.signup.otp);

  const verify = useSelector((state: RootState) => state.signup.verify);
  // 이메일 인증
  const handleVerifyEmail = () => {
    dispatch<any>(
      verifyEmail({
        email: email,
      })
    );
  };

  // otp 확인
  const handleConfirmEmailCode = () => {
    dispatch<any>(
      confirmEmailCode({
        email: email,
        emailOtp: otp,
      })
    );
  };

  const isEmailVerified = useSelector(
    (state: RootState) => state.signup.verify.isEmailVerified
  );
  useEffect(() => {
    if (!isEmailVerified) return;
    dispatch(
      setAlert({
        title: "알림",
        message: "이메일을 전송했습니다. 확인해주세요.",
        color: "info",
      })
    );
  }, [isEmailVerified]);

  const isOtpVerified = useSelector(
    (state: RootState) => state.signup.verify.isOtpVerified
  );
  useEffect(() => {
    if (!isOtpVerified) return;
    dispatch(
      setAlert({
        title: "알림",
        message: "OTP 인증에 성공했습니다.",
        color: "success",
      })
    );
  }, [isOtpVerified]);

  return (
    <section className="space-y-2">
      <div className="mb-2 block">
        <Label htmlFor="email2" value="이메일" />
      </div>
      <div className="flex justify-between">
        <TextInput
          id="email2"
          type="email"
          value={email}
          onInput={(e) => {
            dispatch(setSignupEmail(e.currentTarget.value));
            dispatch(setIsEmailVerified(false));
          }}
          placeholder="name@email.com"
          required
          shadow
        />
        <Button onClick={handleVerifyEmail}>
          {verify.isEmailVerified ? "v" : "전송"}
        </Button>
      </div>
      <div className="mb-2 block">
        <Label htmlFor="otp" value="인증번호" />
      </div>
      <div className="flex justify-between">
        <TextInput
          id="otp"
          type="text"
          value={otp}
          onInput={(e) => {
            dispatch(setOTP(e.currentTarget.value));
            dispatch(setIsOtpVerified(false));
          }}
          placeholder="******"
          required
          shadow
        />
        <Button onClick={handleConfirmEmailCode}>
          {verify.isOtpVerified ? "v" : "확인"}
        </Button>
      </div>
    </section>
  );
};

export default PersonalSection;
