"use client";

import React from "react";
import Image from "next/image";
import { Label } from "flowbite-react";

const UserAvatarWithLabel: React.FC = () => {
  return (
    <div className="flex justify-start m-2 space-x-4 items-ends">
      <Image
        className="w-10 h-10 rounded-full flex items-center"
        src="/cat.png"
        width={50}
        height={50}
        alt="Rounded avatar"
      />
      <div className="flex-col">
        <Label className="flex items-end text-sm">Nickname</Label>
        <Label className="flex items-end text-xs text-gray-500 dark:text-gray-400">
          Joined in August 2014
        </Label>
      </div>
    </div>
  );
};

export default UserAvatarWithLabel;
