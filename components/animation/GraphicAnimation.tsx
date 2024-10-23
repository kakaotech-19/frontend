"use client";

import React from "react";
import Lottie from "lottie-react";
import GraphicAnimationData from "@/public/animation/graphic.json";

const GraphicAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: GraphicAnimationData,
    DataDatarendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie {...defaultOptions} height={200} width={200} />;
};

export default GraphicAnimation;
