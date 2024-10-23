"use client";

import Lottie from "lottie-react";
import GraphicAnimationData from "@/public/animation/graphic.json";
import { AnimationType } from "@/type";

const GraphicAnimation: React.FC<AnimationType> = ({ style }) => {
  return (
    <Lottie
      animationData={GraphicAnimationData}
      loop={true}
      autoplay={true}
      style={style}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice",
      }}
    />
  );
};

export default GraphicAnimation;
