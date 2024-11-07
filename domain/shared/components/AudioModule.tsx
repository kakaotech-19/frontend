"use client";

import React, { useRef, useState } from "react";
import { MuteSVG, VolumeUpSVG } from "./svg";

interface AudioModuleProps {
  src: string;
}

const AudioModule: React.FC<AudioModuleProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (!src || !audioRef.current) return;

    const audio = audioRef.current;
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <button
        onClick={toggleAudio}
        className="absolute bottom-2 right-2 text-sm font-semibold rounded-full px-2 bg-white opacity-75 border shadow-md"
        type="button"
        aria-label={isPlaying ? "음소거" : "음량 켜기"}
      >
        {src && isPlaying ? <VolumeUpSVG /> : <MuteSVG />}
      </button>

      <audio ref={audioRef} hidden>
        <source src={src} type="audio/mpeg" />
        브라우저가 오디오 요소를 지원하지 않습니다.
      </audio>
    </>
  );
};

export default AudioModule;
