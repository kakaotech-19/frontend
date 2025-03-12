"use client";

import { RootState } from "@/domain/shared/redux";
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
import { setAlert } from "@/domain/noti/slices/notiSlice";

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
    if (nickname.length < 5) {
      dispatch<any>(
        setAlert({
          title: "알림",
          message: "5~15 글자 이상이어야 합니다.",
          color: "info",
        })
      );
      return;
    }
    dispatch<any>(
      checkNicknameDuplicate({
        nickname: nickname,
      })
    );
  };

  // 아이디 중복 확인
  const handleCheckIdDuplicate = () => {
    if (signupId.length < 5) {
      dispatch<any>(
        setAlert({
          title: "알림",
          message: "5~15 글자 이상이어야 합니다.",
          color: "info",
        })
      );
      return;
    }
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
    <section className="space-y-2">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="nickname" value="닉네임" />
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
            {verify.isNicknameVerified ? "v" : "확인"}
          </Button>
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="signup-id" value="로그인 아이디" />
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
            {verify.isSignupIdVerified ? "v" : "확인"}
          </Button>
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password2" value="비밀번호 (8자 이상)" />
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
            value={`비밀번호 재입력 ${isSame ? "" : "일치하지 않습니다."}`}
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
