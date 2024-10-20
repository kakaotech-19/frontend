"use client";

import { Feed } from "@/components/Home";
import React from "react";

const page: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="w-full h-full mt-14">
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
