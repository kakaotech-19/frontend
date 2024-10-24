"use client";

import Lottie from "lottie-react";
import { AnimationType } from "@/type";
import ShareAnimationData from "@/public/lottie-animation/share.json";

const ShareAnimation: React.FC<AnimationType> = ({ style }) => {
  return (
    <Lottie
      animationData={ShareAnimationData}
      loop={true}
      autoplay={true}
      style={style}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice",
      }}
    />
  );
};

export default ShareAnimation;
