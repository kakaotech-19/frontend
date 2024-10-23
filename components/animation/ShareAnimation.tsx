"use client";

import Lottie from "lottie-react";
import ShareAnimationData from "@/public/animation/share.json";
import { AnimationType } from "@/type";

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
