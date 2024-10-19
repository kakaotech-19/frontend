"use client";

import React from "react";
import Image from "next/image";

const page: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="flex w-full max-w-md relative" onClick={() => {}}>
        <Image
          width={500}
          height={500}
          src={"/cat.png"}
          alt={"게시물 이미지"}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className="rounded-md shadow-md"
        />
      </div>
      <div className="w-full max-w-md">
        <p className="h-96 text-md p-2 rounded-none border border-red-300">
          test
        </p>
      </div>
    </div>
  );
};

export default page;
