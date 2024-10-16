"use client";

import KakaoLoginButton from "@/components/Auth/KakaoLoginButton";
import GoogleLoginButton from "@/components/Auth/GoogleLoginButton";
import { Button, FooterDivider } from "flowbite-react";
import { useState } from "react";
import EmailLoginForm from "./EmailLoginForm";
import { useRouter } from "next/navigation";

const Page = () => {
  const [isEmailForm, setIsEmailForm] = useState(false);
  const router = useRouter();
  return (
    <>
      {isEmailForm ? (
        <EmailLoginForm />
      ) : (
        <>
          <KakaoLoginButton onClick={() => {}} />
          <br />
          <GoogleLoginButton onClick={() => {}} />
          <br />
          or
          <FooterDivider />
          <Button className="w-full" onClick={() => setIsEmailForm(true)}>
            Sign in with Email
          </Button>
          <br />
          <Button
            className="w-full bg-white border border-gray-300 text-cyan-600"
            onClick={() => router.push("/signup")}
          >
            Create Account
          </Button>
        </>
      )}
    </>
  );
};

export default Page;
