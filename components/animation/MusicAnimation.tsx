"use client";

import Lottie from "lottie-react";
import MusicAnimationData from "@/public/animation/music.json";
import { AnimationType } from "@/type";

const MusicAnimation: React.FC<AnimationType> = ({ style }) => {
  return (
    <Lottie
      animationData={MusicAnimationData}
      loop={true}
      autoplay={true}
      style={style}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice",
      }}
    />
  );
};

export default MusicAnimation;
