import initMocks from "@/mocks";
import { useEffect } from "react";

const useMocking = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      initMocks();
    }
  }, []);
};

export default useMocking;
