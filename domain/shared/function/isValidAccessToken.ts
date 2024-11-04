// accessToken 형식 검증 메서드 (빈 값만 확인)
const isValidAccessToken = (token: unknown): boolean => {
  return typeof token === "string" && token.trim().length > 0;
};

export default isValidAccessToken;
