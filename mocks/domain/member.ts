import { HttpResponse, http } from "msw";

const url = process.env.NEXT_PUBLIC_API_URL;
export const memberMockups = [
  // 회원 정보
  http.get(url + "/member/detail", () => {
    return HttpResponse.json({
      nickname: "todak",
      email: "ktb@gmail.com",
      characterImageUrl: "/minion1",
    });
  }),

  // 회원 정보 축약
  http.get(url + "/member/summary", () => {
    return HttpResponse.json({
      nickname: "todak",
      characterImageUrl: "/minion2",
    });
  }),

  // 캐릭터 불러오기
  http.get(url + "/member/image", () => {
    return HttpResponse.json({
      characterImageUrl: "/minion3",
    });
  }),

  // 캐릭터 생성
  http.post(url + "/member/image", () => {
    return HttpResponse.json({
      characterImageUrl: "minion4",
    });
  }),

  // 캐릭터 등록
  http.post(url + "/member/image/register", () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // 닉네임 변경
  http.patch(url + "/member/nickname", () => {
    return new HttpResponse("ok", { status: 200 });
  }),
];
