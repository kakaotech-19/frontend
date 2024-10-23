"use client";

import Lottie from "lottie-react";
import ShareAnimationData from "@/public/animation/share.json";

const ShareAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ShareAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie {...defaultOptions} height={200} width={200} />;
};

export default ShareAnimation;
