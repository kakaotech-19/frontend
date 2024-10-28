"use client";

import Lottie from "lottie-react";
import WritingAnimationData from "@/public/lottie-animation/writing.json";
import { AnimationType } from "@/type";

const WritingAnimation: React.FC<AnimationType> = ({ style }) => {
  return (
    <Lottie
      animationData={WritingAnimationData}
      loop={true}
      autoplay={true}
      style={style}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice",
      }}
    />
  );
};

export default WritingAnimation;
