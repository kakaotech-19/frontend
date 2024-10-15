"use client";

import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import {
  setEmail,
  setOTP,
  setPassword,
  setReEnterPassword,
} from "@/store/slices/signup/signupSlice";
import {
  postSignup,
  verifyOTP,
} from "@/store/slices/signup/signupExtraReducers";

const Page = () => {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.signup.email);
  const password = useSelector((state: RootState) => state.signup.password);
  const reEnterPassword = useSelector(
    (state: RootState) => state.signup.reEnterPassword
  );
  const otp = useSelector((state: RootState) => state.signup.otp);

  const handlePostSignup = () => {
    if (password !== reEnterPassword) {
      alert("Passwords do not match");
      return;
    }
    const data = {};
    dispatch<any>(postSignup(data));
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form
        className="flex max-w-md flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email2" value="Your email" />
          </div>
          <TextInput
            id="email2"
            type="email"
            value={email}
            onInput={(e) => dispatch(setEmail(e.currentTarget.value))}
            placeholder="name@email.com"
            required
            shadow
          />
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
              required
              shadow
            />
            <Button onClick={() => dispatch<any>(verifyOTP(otp))}>check</Button>
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Your password" />
          </div>
          <TextInput
            id="password2"
            type="password"
            onInput={(e) => dispatch(setPassword(e.currentTarget.value))}
            value={password}
            required
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeat-password" value="Repeat password" />
          </div>
          <TextInput
            id="repeat-password"
            type="password"
            onInput={(e) => dispatch(setReEnterPassword(e.currentTarget.value))}
            value={reEnterPassword}
            required
            shadow
          />
        </div>
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
    </div>
  );
};

export default Page;
