"use client";

import { RootState } from "@/redux";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkIdDuplicate,
  checkNicknameDuplicate,
} from "../../slices/signup/signupExtraReducers";
import { SIGNUP_STEP } from "../../constants";
import { Button, Label, TextInput } from "flowbite-react";
import {
  setIsNicknameVerified,
  setIsSignupIdVerified,
  setSignupId,
  setSignupNickname,
  setSignupPassword,
  setSignupReEnterPassword,
} from "../../slices/signup/signupSlice";

const AccountSection: React.FC = () => {
  const dispatch = useDispatch();

  const signupStep = useSelector((state: RootState) => state.signup.step);
  const verify = useSelector((state: RootState) => state.signup.verify);
  const nickname = useSelector((state: RootState) => state.signup.nickname);
  const signupId = useSelector((state: RootState) => state.signup.signupId);
  const password = useSelector((state: RootState) => state.signup.password);
  const reEnterPassword = useSelector(
    (state: RootState) => state.signup.reEnterPassword
  );

  // 닉네임 중복 확인
  const handleCheckNicknameDuplicate = () => {
    dispatch<any>(
      checkNicknameDuplicate({
        nickname: nickname,
      })
    );
  };

  // 아이디 중복 확인
  const handleCheckIdDuplicate = () => {
    dispatch<any>(
      checkIdDuplicate({
        loginId: signupId,
      })
    );
  };

  // 화면에 같은지 표시해주기 위한 상태
  const [isSame, setIsSame] = useState(false);
  useEffect(() => {
    if (password.length && password === reEnterPassword) setIsSame(true);
    else setIsSame(false);
  }, [password, reEnterPassword]);

  return (
    <section
      className={`${
        signupStep == SIGNUP_STEP.ACCOUNT ? "" : "hidden"
      } space-y-2`}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="nickname" value="Nickname" />
        </div>
        <div className="flex justify-between">
          <TextInput
            id="nickname"
            type="text"
            value={nickname}
            onInput={(e) => {
              dispatch(setSignupNickname(e.currentTarget.value));
              dispatch(setIsNicknameVerified(false));
            }}
            placeholder=""
            required
            shadow
          />
          <Button onClick={handleCheckNicknameDuplicate}>
            {verify.isNicknameVerified ? "v" : "check"}
          </Button>
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="signup-id" value="Login ID" />
        </div>
        <div className="flex justify-between">
          <TextInput
            id="signup-id"
            type="text"
            value={signupId}
            onInput={(e) => {
              dispatch(setSignupId(e.currentTarget.value));
              dispatch(setIsSignupIdVerified(false));
            }}
            placeholder=""
            required
            shadow
          />
          <Button onClick={handleCheckIdDuplicate}>
            {verify.isSignupIdVerified ? "v" : "check"}
          </Button>
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password2" value="Password (8자 이상)" />
        </div>
        <TextInput
          id="password2"
          type="password"
          onInput={(e) => dispatch(setSignupPassword(e.currentTarget.value))}
          value={password}
          required
          shadow
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="repeat-password"
            value={`Repeat password ${isSame ? "v" : "x"}`}
          />
        </div>
        <TextInput
          id="repeat-password"
          type="password"
          onInput={(e) =>
            dispatch(setSignupReEnterPassword(e.currentTarget.value))
          }
          value={reEnterPassword}
          required
          shadow
        />
      </div>
    </section>
  );
};

export default AccountSection;
