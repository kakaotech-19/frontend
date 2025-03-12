"use client";

import { useHideOnScroll } from "@/domain/shared/hooks";
import { HR } from "flowbite-react";
import Link from "next/link";
import TodakLogoSVG from "../svg/TodakLogoSVG";

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
          <TodakLogoSVG />
          <h1 className="self-center text-2xl text-cyan-700 font-gamja whitespace-nowrap">
            토닥토닥
          </h1>
        </Link>
      </div>
      <HR className="mt-0 mb-0" />
    </nav>
  );
};

export default HeaderNavigation;
