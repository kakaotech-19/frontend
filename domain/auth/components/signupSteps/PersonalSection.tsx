"use client";

import { RootState } from "@/redux";
import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
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
        emailOtp: otp,
      })
    );
  };

  return (
    <section
      className={`${
        signupStep == SIGNUP_STEP.PERSONAL ? "" : "hidden"
      } space-y-2`}
    >
      <div className="mb-2 block">
        <Label htmlFor="email2" value="Email" />
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
          {verify.isEmailVerified ? "✅" : "verify"}
        </Button>
      </div>
      <div className="mb-2 block">
        <Label htmlFor="otp" value="OTP" />
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
          {verify.isOtpVerified ? "✅" : "check"}
        </Button>
      </div>
    </section>
  );
};

export default PersonalSection;
