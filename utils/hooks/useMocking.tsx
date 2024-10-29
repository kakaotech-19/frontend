"use client";

import { useEffect } from "react";

const useMocking = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      require("@/feature/mocks");
    }
  });
};

export default useMocking;
