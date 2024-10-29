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

  // 캐릭터 불러오기
  http.get(url + "/member/image", () => {
    return new HttpResponse.JSON({
      characterImageUrl: "String",
    });
  }),

  // 캐릭터 생성
  http.post(url + "/member/image", () => {
    return new HttpResponse.JSON({
      characterImageUrl: "String",
    });
  }),

  // 캐릭터 등록
  http.post(url + "/member/image/register", () => {
    return new HttpResponse("No Content", { status: 204 });
  }),

  // 닉네임 변경
  http,
];
