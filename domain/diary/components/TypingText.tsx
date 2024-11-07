"use client";

import React, { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  minSpeed?: number; // 최소 타이핑 속도 (기본값 10ms)
  maxSpeed?: number; // 최대 타이핑 속도 (기본값 50ms)
}

const TypingText: React.FC<TypingTextProps> = ({
  text,
  minSpeed = 10,
  maxSpeed = 50,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let isCancelled = false;

    // 비동기로 한 글자씩 타이핑하는 함수
    const typeCharacter = async () => {
      for (let index = 0; index < text.length; index++) {
        if (isCancelled) break; // 컴포넌트가 언마운트되면 루프 중단

        setDisplayedText((prev) => prev + text[index]);

        const randomSpeed = Math.floor(
          Math.random() * (maxSpeed - minSpeed + 1) + minSpeed
        );

        // Promise로 랜덤 속도만큼 대기 후 다음 글자 표시
        await new Promise((resolve) => setTimeout(resolve, randomSpeed));
      }
    };

    typeCharacter();

    return () => {
      isCancelled = true; // 컴포넌트 언마운트 시 루프 중단
    };
  }, [text, minSpeed, maxSpeed]);

  return <>{displayedText}</>;
};

export default TypingText;
