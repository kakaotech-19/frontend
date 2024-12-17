"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "@/domain/shared/redux";
import { Label } from "flowbite-react";

const CurrentProfileLabel: React.FC = () => {
  const characterImageUrl = useSelector(
    (state: RootState) => state.member.profile.characterImageUrl
  );
  return (
    <div className="space-y-2">
      <Label value="현재 프로필" className="ml-2" />
      <label className="flex flex-col items-start justify-center w-36 h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-s0 dark:hover:border-gray-500">
        {characterImageUrl ? (
          <Image
            width={150}
            height={150}
            src={characterImageUrl}
            alt={`현재 이미지${characterImageUrl}`}
            sizes="100vw"
            style={{ width: "100%", height: "100%" }}
            className="rounded-lg shadow-md object-cover"
          />
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <p
              className="
            text-xs text-gray-500 dark:text-gray-400"
            >
              프로필을 등록해주세요
            </p>
          </div>
        )}
      </label>
    </div>
  );
};

export default CurrentProfileLabel;
