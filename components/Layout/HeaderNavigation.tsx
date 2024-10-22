"use client";

import useHideOnScroll from "@/hooks/useHideOnScroll";
import { HR } from "flowbite-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

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
          href="#"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-6 ml-2"
            alt="Flowbite Logo"
          />
          <h1 className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            TODAK
          </h1>
        </Link>
      </div>
      <HR className="mt-0 mb-0" />
    </nav>
  );
};

export default HeaderNavigation;
