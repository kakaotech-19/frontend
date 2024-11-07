"use client";

import { ButtonType } from "@/domain/shared/types/common";
import { Button } from "flowbite-react";
import React from "react";

const AlertButton: React.FC<ButtonType> = ({ onClick, text }) => {
  return (
    <div className="flex justify-end">
      <Button size="xs" className="mt-2" onClick={onClick}>
        {text}
      </Button>
    </div>
  );
};

export default AlertButton;
