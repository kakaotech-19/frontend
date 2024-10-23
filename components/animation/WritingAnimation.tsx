"use client";

import Lottie from "lottie-react";
import writingAnimationData from "@/public/animation/writing.json";

const WritingAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: writingAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie {...defaultOptions} height={200} width={200} />;
};

export default WritingAnimation;
