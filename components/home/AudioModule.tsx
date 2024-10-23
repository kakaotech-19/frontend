"use client";

import React, { useRef, useState } from "react";
import { MuteSVG, VolumeUpSVG } from "../svg";

interface AudioModuleProps {
  src: string;
}

const AudioModule: React.FC<AudioModuleProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const handleClickAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <div
        onClick={handleClickAudio}
        className="absolute bottom-2 right-2 text-sm font-semibold rounded-full pl-2 pr-2 bg-white opacity-75"
      >
        {isPlaying ? <VolumeUpSVG /> : <MuteSVG />}
      </div>
      <audio ref={audioRef} style={{ display: "none" }}>
        <source src={src} type="audio/mpeg" />
        브라우저가 오디오 요소를 지원하지 않습니다.
      </audio>
    </>
  );
};

export default AudioModule;
