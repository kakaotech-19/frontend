"use client";

import { RootState } from "@/store";
import {
  setLoginEmail,
  setLoginPassword,
} from "@/store/slices/login/loginSlice";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.login.email);
  const password = useSelector((state: RootState) => state.login.password);

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-80 h-80">
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              value={email}
              onInput={(e) => dispatch(setLoginEmail(e.currentTarget.value))}
              placeholder="name@email.com"
              required
            />
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              value={password}
              onInput={(e) => dispatch(setLoginPassword(e.currentTarget.value))}
              required
            />
          </div>
          <Button type="submit">Submit</Button>
          <text
            className="text-blue-700 text-sm text-center"
            onClick={() => router.push("/signup")}
          >
            회원가입하기
          </text>
        </form>
      </Card>
    </div>
  );
};

export default Page;
