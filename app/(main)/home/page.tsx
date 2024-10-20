"use client";

import { Feed } from "@/components/Home";
import React from "react";

const page: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full max-w-md mt-14">
        {/* Your component code here */}
        <Feed />
        <Feed />
        <Feed />
        <Feed />
        <Feed />
        <Feed />
        <Feed />
        <Feed />
        <Feed />
        <Feed />
      </div>
    </div>
  );
};

export default page;
