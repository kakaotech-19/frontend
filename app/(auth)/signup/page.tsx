"use client";

import { RootState } from "@/redux";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, HR, Label, TextInput } from "flowbite-react";
import {
  resetSignupState,
  setIsEmailVerified,
  setIsNicknameVerified,
  setIsOtpVerified,
  setIsPrivacyAgreed,
  setIsSignupIdVerified,
  setIsTermsAgreed,
  setOTP,
  setSignupEmail,
  setSignupId,
  setSignupNickname,
  setSignupPassword,
  setSignupReEnterPassword,
} from "@/domain/auth/slices/signup/signupSlice";
import {
  checkIdDuplicate,
  checkNicknameDuplicate,
  confirmEmailCode,
  registerUser,
  verifyEmail,
} from "@/domain/auth/slices/signup/signupExtraReducers";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setIsIdLoginFormView } from "@/domain/auth/slices/login/loginSlice";
import path from "@/domain/shared/routes";
import {
  PrivacyPolicyModal,
  TermsAndConditionsModal,
} from "@/domain/auth/components";
import {
  CheckIdDuplicateType,
  CheckNicknameDuplicateType,
  ConfirmEmailCodeType,
  RegisterUserType,
  VerifyEmailType,
} from "@/domain/auth/dto/request";
import { AlertType } from "@/domain/noti/types";
import { setAlert } from "@/domain/noti/slices/notiSlice";

const Page = () => {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.signup.email);
  const nickname = useSelector((state: RootState) => state.signup.nickname);
  const otp = useSelector((state: RootState) => state.signup.otp);
  const signupId = useSelector((state: RootState) => state.signup.signupId);
  const password = useSelector((state: RootState) => state.signup.password);
  const reEnterPassword = useSelector(
    (state: RootState) => state.signup.reEnterPassword
  );

  // 회원가입 성공시 유저 라우팅
  const router = useRouter();
  const isSignup = useSelector((state: RootState) => state.signup.isSignup);
  useEffect(() => {
    if (isSignup) {
      const data: AlertType = {
        title: "알림",
        message: "회원가입이 완료되었습니다. 로그인해주세요.",
        color: "green",
      };
      dispatch(setAlert(data));
      router.push(path.LOGIN);
      dispatch(resetSignupState());
      dispatch(setIsIdLoginFormView(true));
    }
  }, [isSignup]);

  // 화면에 같은지 표시해주기 위한 상태
  const [isSame, setIsSame] = useState(false);
  useEffect(() => {
    if (password.length && password === reEnterPassword) setIsSame(true);
    else setIsSame(false);
  }, [password, reEnterPassword]);

  // 회원가입 상태 검사
  const verify = useSelector((state: RootState) => state.signup.verify);
  const validateSignup = () => {
    return (
      verify.isEmailVerified &&
      verify.isOtpVerified &&
      verify.isNicknameVerified &&
      verify.isSignupIdVerified &&
      verify.isTermsAgreed &&
      verify.isPrivacyAgreed &&
      password === reEnterPassword
    );
  };

  const [openTermsModal, setOpenTermsModal] = useState(false);
  const [openPrivacyModal, setOpenPrivacyModal] = useState(false);

  // 회원가입
  const handlePostSignup = () => {
    if (!validateSignup()) {
      const data: AlertType = {
        title: "알림",
        message: "모든 항목을 확인해주세요.",
        color: "red",
      };
      dispatch(setAlert(data));
      return;
    }
    const data: RegisterUserType = {
      email: email,
      nickname: nickname,
      loginId: signupId,
      password: password,
    };
    dispatch<any>(registerUser(data));
  };

  // 이메일 인증
  const handleVerifyEmail = () => {
    const data: VerifyEmailType = {
      email: email,
    };
    dispatch<any>(verifyEmail(data));
  };

  // otp 확인
  const handleConfirmEmailCode = () => {
    const data: ConfirmEmailCodeType = {
      emailOtp: otp,
    };
    dispatch<any>(confirmEmailCode(data));
  };

  // 닉네임 중복 확인
  const handleCheckNicknameDuplicate = () => {
    const data: CheckNicknameDuplicateType = {
      nickname: nickname,
    };
    dispatch<any>(checkNicknameDuplicate(data));
  };

  // 아이디 중복 확인
  const handleCheckIdDuplicate = () => {
    const data: CheckIdDuplicateType = {
      loginId: signupId,
    };
    dispatch<any>(checkIdDuplicate(data));
  };

  return (
    <form
      className="w-80 flex flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
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
      </div>
      <div>
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
      </div>
      <HR className="mt-0" />
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
            {verify.isNicknameVerified ? "✅" : "check"}
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
            {verify.isSignupIdVerified ? "✅" : "check"}
          </Button>
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password2" value="Password" />
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
            value={`Repeat password ${isSame ? "✅" : "❌"}`}
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
      <HR className="mt-0 mb-2" />
      <div className="flex items-center gap-2">
        <Checkbox
          id="agree"
          onChange={(e) => dispatch(setIsTermsAgreed(e.target.checked))}
          required
        />
        <Label htmlFor="agree" className="flex">
          I agree with the&nbsp;
          <p
            onClick={() => setOpenTermsModal(true)}
            className="text-cyan-600 hover:underline dark:text-cyan-500 underline"
          >
            terms and conditions
          </p>
          <TermsAndConditionsModal
            open={openTermsModal}
            onClose={() => setOpenTermsModal(false)}
          />
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="agree"
          onChange={(e) => dispatch(setIsPrivacyAgreed(e.target.checked))}
          required
        />
        <Label htmlFor="agree" className="flex">
          I agree with the&nbsp;
          <p
            onClick={() => setOpenPrivacyModal(true)}
            className="text-cyan-600 hover:underline dark:text-cyan-500 underline"
          >
            privacy policy
          </p>
          <PrivacyPolicyModal
            open={openPrivacyModal}
            onClose={() => setOpenPrivacyModal(false)}
          />
        </Label>
      </div>
      <Button type="submit" onClick={handlePostSignup}>
        Register new account
      </Button>
    </form>
  );
};

export default Page;
