"use client";

import React from "react";
import Image from "next/image";
import { HR, Label } from "flowbite-react";

const Feed: React.FC = () => {
  return (
    <>
      <div className="jusfity-center w-full max-w-md h-96 border-b border-gray-200">
        <div className="flex justify-start mt-2 ml-2 space-x-4 items-ends">
          <Image
            className="w-10 h-10 rounded-full flex items-center"
            src="/cat.png"
            width={40}
            height={40}
            alt="Rounded avatar"
          />
          <Label className="flex items-end">Nickname</Label>
        </div>
        <HR className="mt-2 mb-0" />
        <Image
          width={50}
          height={40}
          src={"/cat.png"}
          alt={""}
          className="w-full h-80"
        />
      </div>
    </>
  );
};

export default Feed;
