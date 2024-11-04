// accessToken 형식 검증 메서드 (JWT 형식 검증 예시)
const isValidAccessToken = (token: string): boolean => {
  const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
  return jwtRegex.test(token);
};

export default isValidAccessToken;
