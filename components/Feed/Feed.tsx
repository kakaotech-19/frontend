"use client";

import React from "react";
import Image from "next/image";
import { HR, Label } from "flowbite-react";

const Feed: React.FC = () => {
  return (
    <>
      <div className="jusfity-center w-full max-w-md border-b border-gray-200">
        <div className="flex justify-start m-2 space-x-4 items-ends">
          <Image
            className="w-10 h-10 rounded-full flex items-center"
            src="/cat.png"
            width={40}
            height={40}
            alt="Rounded avatar"
          />
          <Label className="flex items-end">Nickname</Label>
        </div>
        <div className="w-full relative" onClick={() => {}}>
          <Image
            width={0}
            height={0}
            src={"/cat.png"}
            alt={"게시물 이미지"}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="rounded-md shadow-md"
          />
        </div>
        <HR className="mb-0" />
      </div>
    </>
  );
};

export default Feed;
