import { HttpResponse, http } from "msw";

const url = process.env.NEXT_PUBLIC_API_URL;
export const authMockups = [
  // 이메일 인증
  http.post(url + "/auth/email", () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // 이메일 인증번호 확인
  http.post(url + "/auth/email/otp", () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // 닉네임 중복 확인
  http.post(url + "/auth/nickname", () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // 아이디 중복 확인
  http.post(url + "/auth/login-id", () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // 회원가입
  http.post(url + "/auth/signup", () => {
    return new HttpResponse("created", { status: 201 });
  }),

  // 로그인
  http.post(url + "/auth/login", () => {
    return HttpResponse.json({
      username: "string",
      accessToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidXNlcm5hbWUiOiJzdHJpbmciLCJyb2xlIjoiUk9MRV9URU1QIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTczMDQyOTE5OSwiZXhwIjoxNzMwNDMwOTk5fQ.qlCFLaCRn4kLbitgZCk5S6VyPLhhFmZF0DttcjT2WX1WnvrpiPWieL61ABafWV3h8PVod8C5lBSGdwbJ1_0syg",
    });
  }),

  // 로그아웃
  http.post(url + "/auth/logout", () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // 회원 탈퇴
  http.post(url + "/auth/deactivate", () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // 토큰 재발급
  http.post(url + "/auth/refresh-token", () => {
    return HttpResponse.json({
      accessToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidXNlcm5hbWUiOiJzdHJpbmciLCJyb2xlIjoiUk9MRV9URU1QIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTczMDQyOTE5OSwiZXhwIjoxNzMwNDMwOTk5fQ.qlCFLaCRn4kLbitgZCk5S6VyPLhhFmZF0DttcjT2WX1WnvrpiPWieL61ABafWV3h8PVod8C5lBSGdwbJ1_0syg",
    });
  }),
];
