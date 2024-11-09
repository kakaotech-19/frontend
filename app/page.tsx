"use client";

import { Button } from "flowbite-react";
import Link from "next/link";
import { Logo } from "@/domain/shared/components/layout";
import path from "@/domain/shared/routes";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  PrivacyPolicyModal,
  TermsAndConditionsModal,
} from "@/domain/auth/components";

const Page = () => {
  const [openTermsModal, setOpenTermsModal] = useState(false);
  const [openPrivacyModal, setOpenPrivacyModal] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      window.location.href = path.HOME;
    }
  }, []);
  return (
    <div className="w-full flex flex-col min-h-screen justify-center items-center overflow-x-hidden">
      <main className="w-full min-h-screen">
        <Image
          width={500}
          height={500}
          src="/background.svg"
          alt="background"
          sizes="100vw"
          style={{ width: "100%", height: "100%" }}
        />
        <h1 className="w-full flex justify-center">
          <Logo />
        </h1>{" "}
        <div className="w-full px-4 mt-10">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-3">
              <h1 className="text-xl font-bold tracking-tighter text-black">
                당신의 이야기를 공유하세요.
              </h1>
              <p className="mx-auto max-w-[700px] text-black text-md">
                토닥토닥은 다양한 삶을 살아가는 사람들과 <br />
                일상 경험을 만화로 공유하는 <br />
                소셜 다이어리 플랫폼입니다.
              </p>
            </div>
            <Link href={path.LOGIN} className="flex justify-center">
              <Button size="md">시작하기</Button>
            </Link>
            {/* <WritingAnimation /> */}
          </div>
        </div>
      </main>
      <footer className="w-full flex flex-col gap-2 py-6 shrink-0 items-center px-4 border-t bg-white">
        <p className="text-xs text-gray-600">
          © 2024 todaktoday. All rights reserved.
        </p>
        <nav className="flex gap-4">
          <p
            className="text-xs hover:underline underline-offset-4 text-gray-600"
            onClick={() => setOpenTermsModal(true)}
          >
            서비스 약관
          </p>
          <TermsAndConditionsModal
            open={openTermsModal}
            onClose={() => setOpenTermsModal(false)}
          />
          <p
            className="text-xs hover:underline underline-offset-4 text-gray-600"
            onClick={() => setOpenPrivacyModal(true)}
          >
            개인정보 처리방침
          </p>
          <PrivacyPolicyModal
            open={openPrivacyModal}
            onClose={() => setOpenPrivacyModal(false)}
          />
        </nav>
      </footer>
    </div>
  );
};

export default Page;
