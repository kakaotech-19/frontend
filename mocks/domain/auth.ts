import { HttpResponse, http } from "msw";

const url = process.env.NEXT_PUBLIC_API_URL;
export const authMockups = [
  // 이메일 인증
  http.post(url + "/auth/email", () => {
    return new HttpResponse("No Content", { status: 204 });
  }),

  // 이메일 인증번호 확인
  http.post(url + "/auth/email/otp", () => {
    return new HttpResponse("No Content", { status: 204 });
  }),

  // 닉네임 중복 확인
  http.post(url + "/auth/nickname", () => {
    return new HttpResponse("No Content", { status: 204 });
  }),

  // 아이디 중복 확인
  http.post(url + "/auth/login-id", () => {
    return new HttpResponse("No Content", { status: 204 });
  }),

  // 회원가입
  http.post(url + "/auth/signup", () => {
    return new HttpResponse("created", { status: 201 });
  }),
];
