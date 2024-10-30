"use client";

import { RootState } from "@/feature/redux";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, HR, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import {
  setOTP,
  setSignupEmail,
  setSignupId,
  setSignupNickname,
  setSignupPassword,
  setSignupReEnterPassword,
} from "@/feature/redux/slices/signup/signupSlice";
import {
  checkIdDuplicate,
  checkNicknameDuplicate,
  confirmEmailCode,
  registerUser,
  verifyEmail,
} from "@/feature/redux/slices/signup/signupExtraReducers";
import { useEffect, useState } from "react";
import {
  CheckIdDuplicateType,
  CheckNicknameDuplicateType,
  ConfirmEmailCodeType,
  RegisterUserType,
  VerifyEmailType,
} from "@/utils/types/dto";

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
  const [isSame, setIsSame] = useState(false);

  useEffect(() => {
    if (password.length && password === reEnterPassword) setIsSame(true);
    else setIsSame(false);
  }, [password, reEnterPassword]);

  const handlePostSignup = () => {
    if (password !== reEnterPassword) {
      alert("Passwords do not match");
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

  const handleVerifyEmail = () => {
    const data: VerifyEmailType = {
      email: email,
    };
    dispatch<any>(verifyEmail(data));
  };

  const handleConfirmEmailCode = () => {
    const data: ConfirmEmailCodeType = {
      emailOtp: otp,
    };
    dispatch<any>(confirmEmailCode(data));
  };

  const handleCheckNicknameDuplicate = () => {
    const data: CheckNicknameDuplicateType = {
      nickname: nickname,
    };
    dispatch<any>(checkNicknameDuplicate(data));
  };

  const handleCheckIdDuplicate = () => {
    const data: CheckIdDuplicateType = {
      loginId: signupId,
    };
    dispatch<any>(checkIdDuplicate(data));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email2" value="Email" />
        </div>
        <div className="flex justify-between">
          <TextInput
            id="email2"
            type="email"
            value={email}
            onInput={(e) => dispatch(setSignupEmail(e.currentTarget.value))}
            placeholder="name@email.com"
            required
            shadow
          />
          <Button onClick={handleVerifyEmail}>verify</Button>
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
            onInput={(e) => dispatch(setOTP(e.currentTarget.value))}
            placeholder="******"
            required
            shadow
          />
          <Button onClick={handleConfirmEmailCode}>check</Button>
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
            onInput={(e) => dispatch(setSignupNickname(e.currentTarget.value))}
            placeholder=""
            required
            shadow
          />
          <Button onClick={handleCheckNicknameDuplicate}>check</Button>
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
            onInput={(e) => dispatch(setSignupId(e.currentTarget.value))}
            placeholder=""
            required
            shadow
          />
          <Button onClick={handleCheckIdDuplicate}>check</Button>
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
            value={`Repeat password ${isSame ? "✓" : ""}`}
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
      <HR className="mt-0" />
      <div className="flex items-center gap-2">
        <Checkbox id="agree" required />
        <Label htmlFor="agree" className="flex">
          I agree with the&nbsp;
          <Link
            href="#"
            className="text-cyan-600 hover:underline dark:text-cyan-500"
          >
            terms and conditions
          </Link>
        </Label>
      </div>
      <Button type="submit" onClick={handlePostSignup}>
        Register new account
      </Button>
    </form>
  );
};

export default Page;
