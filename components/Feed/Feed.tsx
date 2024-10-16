"use client";

import React from "react";
import Image from "next/image";
import { HR } from "flowbite-react";
import { UserAvatarWithLabel } from "../User";

const Feed: React.FC = () => {
  return (
    <>
      <div className="jusfity-center w-full max-w-md border-b border-gray-200">
        <UserAvatarWithLabel />
        <div className="w-full relative" onClick={() => {}}>
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
        <HR className="mb-0" />
      </div>
    </>
  );
};

export default Feed;
