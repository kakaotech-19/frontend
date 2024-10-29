import { HttpResponse, http } from "msw";

const url = process.env.NEXT_PUBLIC_API_URL;
export const memberMockups = [
  // 회원 정보
  http.get(url + "/member/detail", () => {
    return new HttpResponse.JSON({
      nickname: "todak",
      email: "ktb@gmail.com",
      characterImageUrl: "https://s3-url.com",
    });
  }),

  // 회원 정보 축약
  http.get(url + "/member/summary", () => {
    return new HttpResponse.JSON({
      nickname: "todak",
      characterImageUrl: "https://s3-url.com",
    });
  }),
];
