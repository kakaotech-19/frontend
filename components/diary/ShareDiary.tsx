"use client";

import { Button, Datepicker } from "flowbite-react";
import React from "react";
import { ShareSVG } from "../svg";
import AudioModule from "../home/AudioModule";
import Image from "next/image";

const ShareDiary: React.FC = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <Datepicker className="" autoHide={false} />
        <Button
          onClick={() => {}}
          className="flex justify-end items-center h-10"
        >
          업로드
          <div className="ml-2">
            <ShareSVG />
          </div>
        </Button>
      </div>
      <div className="w-full relative">
        <Image
          width={500}
          height={500}
          src={"/cat.png"}
          alt={"게시물 이미지"}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className="rounded-md shadow-md"
        />
        <AudioModule src="https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3" />
      </div>
    </>
  );
};

export default ShareDiary;
