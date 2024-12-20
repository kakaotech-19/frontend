"use client";

import { HR, Label } from "flowbite-react";
import React, { useEffect, useState } from "react";

const Logo: React.FC = () => {
  const [index, setIndex] = useState(0);

  const title = "토닥토닥!";

  const keyword = [
    "일상을 나누는 일기, 마음을 따뜻하게 감싸다",
    "토닥, 마음을 감싸는 일기",
    "오늘 하루는 어땠나요?",
    "만화로 만나는 감성 SNS",
  ];

  useEffect(() => {
    setTimeout(() => {
      setIndex((index + 1) % keyword.length);
    }, 10000);
  }, [index]);

  return (
    <div>
      <Label htmlFor="todak-title" className="flex items-center justify-center">
        <h1 id="todak-title" className="text-3xl font-bold text-cyan-800">
          <div className="flex gap-2">
            <img src="/todak-logo.svg" />
            <p className="font-gamja text-6xl">{title}</p>
          </div>
        </h1>
      </Label>
      <HR className="mt-1 mb-2" />
      <Label className="text-sm font-medium text-cyan-700 animate-pulse flex justify-center">
        {keyword[index]}
      </Label>
    </div>
  );
};

export default Logo;
