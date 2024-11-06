"use client";

import { Button } from "flowbite-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Logo } from "@/domain/shared/components/layout";
import path from "@/domain/shared/routes";
import { useEffect, useState } from "react";
import Image from "next/image";

const DynamicGraphicAnimation = dynamic(
  () => import("@/domain/shared/components/lottie-animation/GraphicAnimation"),
  {
    ssr: false,
  }
);
const DynamicMusicAnimation = dynamic(
  () => import("@/domain/shared/components/lottie-animation/MusicAnimation"),
  {
    ssr: false,
  }
);
const DynamicShareAnimation = dynamic(
  () => import("@/domain/shared/components/lottie-animation/ShareAnimation"),
  {
    ssr: false,
  }
);
const DynamicWritingAnimation = dynamic(
  () => import("@/domain/shared/components/lottie-animation/WritingAnimation"),
  {
    ssr: false,
  }
);

const page = () => {
  const [index, setIndex] = useState(0);
  const animationImages = [
    <DynamicWritingAnimation />,
    <DynamicMusicAnimation />,
    <DynamicGraphicAnimation />,
  ];

  useEffect(() => {
    setTimeout(() => {
      setIndex((index + 1) % animationImages.length);
    }, 10000);
  }, [index]);

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
            {animationImages[index]}
          </div>
        </div>
      </main>
      <footer className="w-full flex flex-col gap-2 py-6 shrink-0 items-center px-4 border-t bg-white">
        <p className="text-xs text-gray-600">
          © 2024 todaktoday. All rights reserved.
        </p>
        <nav className="flex gap-4">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-600"
            href="#"
          >
            서비스 약관
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-600"
            href="#"
          >
            개인정보 처리방침
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default page;
