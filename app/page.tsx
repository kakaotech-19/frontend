"use client";

import {
  GraphicAnimation,
  MusicAnimation,
  ShareAnimation,
  WritingAnimation,
} from "@/components/animation";
import { Logo } from "@/components/layout";
import path from "@/routes";
import { Button } from "flowbite-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full flex flex-col min-h-screen justify-center items-center bg-gray-50">
      <main className="flex-1 w-full">
        <section className="w-full min-h-screen py-16 bg-white">
          <h1 className=" w-full flex justify-center bg-white">
            <Logo />
          </h1>{" "}
          <div className="w-full px-4 mt-10">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-3">
                <h1 className="text-2xl font-bold tracking-tighter text-black">
                  당신의 이야기를 공유하세요.
                </h1>
                <p className="mx-auto max-w-[700px] text-black text-md">
                  토닥토닥은 일상 경험을 공유하고 <br />
                  다양한 삶을 살아가는 사람들과 소통할 수 있는 <br />
                  소셜 다이어리 플랫폼입니다.
                </p>
              </div>
              <Link href={path.LOGIN}>
                {" "}
                <Button size="md">시작하기</Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-16 bg-white">
          <div className="w-full px-4">
            <div className="space-y-10 mt-20">
              <h2 className="text-3xl font-bold tracking-tighter text-center text-gray-800">
                이용 방법
              </h2>
              <div className="h-screen mb-80 flex flex-col items-center space-y-4 text-center">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="w-80">
                    <WritingAnimation />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    당신의 이야기를 작성하세요
                  </h3>
                  <p className="text-gray-600">
                    언제 어디서든 하고싶은 이야기, <br />
                    느낀 감정을 들어드릴게요.
                  </p>
                </div>
              </div>
              <div className="h-screen mb-80 flex flex-col items-center space-y-4 text-center">
                <div className="w-80">
                  <MusicAnimation />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  일상이 웹툰과 음악으로 재탄생합니다
                </h3>
                <p className="text-gray-600">
                  일상을 마치 만화 속 한 장면처럼 <br />
                  더욱 생생하게 공유하세요.
                </p>
              </div>
              <div className="h-screen mb-80 flex flex-col items-center space-y-4 text-center">
                <div className="w-64 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 bg-white">
                      <ShareAnimation />
                    </div>
                  </div>
                  <GraphicAnimation />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  스토리의 주인공이 되어보세요
                </h3>
                <p className="text-gray-600">
                  다른 사용자들의 이야기를 발견하고 <br />
                  소통하며 의미 있는 관계를 만드세요.
                </p>
              </div>
            </div>
          </div>
        </section>
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
