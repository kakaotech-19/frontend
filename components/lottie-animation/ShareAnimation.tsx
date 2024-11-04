"use client";

import Lottie from "lottie-react";
import ShareAnimationData from "@/public/lottie-animation/share.json";
import { AnimationType } from "@/domain/shared/types/common";

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
