"use client";

import { ButtonType } from "@/domain/shared/types/common";
import { Button } from "flowbite-react";
import React from "react";

const RedirectCharacterButton: React.FC<ButtonType> = ({ onClick }) => {
  return (
    <div className="flex justify-end">
      <Button size="xs" className="mt-2" onClick={onClick}>
        캐릭터 만들러 가기
      </Button>
    </div>
  );
};

export default RedirectCharacterButton;
