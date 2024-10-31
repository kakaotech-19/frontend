"use client";

import { useEffect } from "react";

const useMocking = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      (async () => {
        const { initMocks } = await import("@/feature/mocks");
        await initMocks(); // initMocks를 비동기로 호출하여 초기화 완료
      })();
    }
  }, []);
};

export default useMocking;
