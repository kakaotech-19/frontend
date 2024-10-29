import { HttpResponse, http } from "msw";

const url = process.env.NEXT_PUBLIC_API_URL;
export const memberMockups = [
  // 이메일 인증
  //   http.post(url + "/auth/email", () => {
  //     return new HttpResponse("No Content", { status: 204 });
  //   }),
];
