"use client";

import { HR } from "flowbite-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const HeaderNavigation: React.FC = () => {
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
    <nav
      className={`fixed w-full transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 z-50`}
    >
      <div className="max-w-md flex flex-wrap items-center justify-between mx-auto p-2">
        <Link
          href="#"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <h1 className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
            TODAK
          </h1>
        </Link>
      </div>
      <HR className="mt-0 mb-0" />
    </nav>
  );
};

export default HeaderNavigation;
