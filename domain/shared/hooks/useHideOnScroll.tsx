"use client";

import React, { useEffect, useState } from "react";

const useHideOnScroll = () => {
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

  return [isVisible] as const;
};

export default useHideOnScroll;
