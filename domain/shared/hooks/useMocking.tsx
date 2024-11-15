import { mocking } from "@/app/globals";
import initMocks from "@/mocks";
import { useEffect } from "react";

const useMocking = () => {
  useEffect(() => {
    if (mocking === "enabled") {
      initMocks();
    }
  }, []);
};

export default useMocking;
