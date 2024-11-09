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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJyb2xlIjoiUk9MRV9BRE1JTiIsInR5cGUiOiJ0ZXN0In0.EBDROF-1Ia-1bFHUmctBxEL_I7FsAOQFwTMT4vr_wQI",
    });
  }),

  // 로그아웃 (성공 및 에러 응답 처리)
  http.post(url + "/auth/logout", () => {
    // return new HttpResponse(
    //   JSON.stringify({
    //     title: "TEMP_USER_DIARY_CREATE_FAIL",
    //     message: "로그아웃할 수 없습니다.",
    //   }),
    //   {
    //     status: 404,
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );
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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJyb2xlIjoiUk9MRV9BRE1JTiIsInR5cGUiOiJ0ZXN0In0.EBDROF-1Ia-1bFHUmctBxEL_I7FsAOQFwTMT4vr_wQI",
    });
  }),
];
