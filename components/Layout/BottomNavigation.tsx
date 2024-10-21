"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import path from "@/routes";
import { HomeSVG, PencilSVG, UserSVG } from "../svg";

const BottomNavigation: React.FC = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY) {
          // 스크롤 내릴 때
          setIsVisible(false);
        } else {
          // 스크롤 올릴 때
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // 클린업 함수
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);
  return (
    <div
      className={`fixed bottom-0 left-0 z-50 w-full bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid h-16 max-w-lg grid-cols-3 mx-auto font-medium">
        <button
          type="button"
          onClick={() => router.push(path.HOME)}
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <HomeSVG />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-500">
            Home
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          onClick={() => router.push(path.WRITE)}
        >
          <PencilSVG />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-500">
            Diary
          </span>
        </button>
        <button
          type="button"
          onClick={() => router.push(path.MY)}
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <UserSVG />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-500">
            My
          </span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;
