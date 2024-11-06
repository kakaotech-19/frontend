"use client";

import { useHideOnScroll } from "@/domain/shared/hooks";
import { HR } from "flowbite-react";
import Link from "next/link";

const HeaderNavigation: React.FC = () => {
  const [isVisible] = useHideOnScroll();

  return (
    <nav
      className={`fixed w-full transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 z-50`}
    >
      <div className="flex flex-wrap items-center justify-between mx-auto p-2">
        <Link
          href="/home"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/todak-logo.svg" className="h-6 ml-2" alt="Flowbite Logo" />
          <h1 className="self-center text-2xl font-gamja whitespace-nowrap dark:text-white">
            TODAK
          </h1>
        </Link>
      </div>
      <HR className="mt-0 mb-0" />
    </nav>
  );
};

export default HeaderNavigation;
