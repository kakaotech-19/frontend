"use client";

import React from "react";
import Image from "next/image";
import { Label } from "flowbite-react";

interface UserAvatarWithLabelProps {
  imageUrl?: string;
  nickname: string;
  description?: string;
}

const UserAvatarWithLabel: React.FC<UserAvatarWithLabelProps> = ({
  imageUrl,
  nickname,
  description,
}) => {
  return (
    <div className="flex justify-start m-2 space-x-4 items-ends">
      <Image
        className="w-10 h-10 rounded-full flex items-center"
        src={imageUrl || "/cat.png"}
        width={50}
        height={50}
        alt="Rounded avatar"
      />
      <div className="flex-col">
        <Label className="flex items-end text-md">{nickname}</Label>
        <Label className="flex items-end text-xs text-gray-500 dark:text-gray-400">
          {description}
        </Label>
      </div>
    </div>
  );
};

export default UserAvatarWithLabel;
