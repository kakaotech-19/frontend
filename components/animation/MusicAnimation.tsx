"use client";

import React from "react";
import Lottie from "lottie-react";
import MusicAnimationData from "@/public/animation/music.json";

const MusicAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: MusicAnimationData,
    DatarendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie {...defaultOptions} height={200} width={200} />;
};

export default MusicAnimation;
