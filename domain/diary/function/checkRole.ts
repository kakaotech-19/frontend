import { JWT_ROLE } from "@/domain/shared/constants";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("accessToken");
const checkWriteRole = (): boolean => {
  if (!token) return false;
  try {
    const decodedToken = jwtDecode(token as string);
    return decodedToken.role !== JWT_ROLE.ROLE_TEMP;
  } catch (error) {
    console.error("Failed to decode token", error);
    return false;
  }
};

export default checkWriteRole;
