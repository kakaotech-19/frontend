"use client";

import { BottomNavigation } from "@/components/Layout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Your component code here */}
      <>{children}</>
      <BottomNavigation />
    </>
  );
};

export default layout;
