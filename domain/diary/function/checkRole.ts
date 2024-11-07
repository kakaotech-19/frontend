import { JWT_ROLE } from "@/domain/shared/constants";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
}

const checkWriteRole = (): boolean => {
  if (typeof window === "undefined") {
    // 서버사이드에서는 localStorage에 접근할 수 없으므로 false 반환
    return false;
  }
  const token = localStorage.getItem("accessToken");
  if (!token) return false;
  try {
    const decodedToken = jwtDecode<DecodedToken>(token as string);
    return decodedToken.role !== JWT_ROLE.ROLE_TEMP;
  } catch (error) {
    console.error("Failed to decode token", error);
    return false;
  }
};

export default checkWriteRole;
