import { apiVersion, url } from "@/app/globals";
import { HttpResponse, http } from "msw";

export const memberMockups = [
  // 회원 정보
  http.get(url + apiVersion + "/member/profile", () => {
    return HttpResponse.json({
      nickname: "todak",
      email: "ktb@gmail.com",
      characterImageUrl: "/minion1.png",
    });
  }),

  // 캐릭터 불러오기
  http.get(url + apiVersion + "/member/character", () => {
    return HttpResponse.json({
      characterImageUrl: "/minion3.png",
    });
  }),

  // 캐릭터 생성
  http.post(url + apiVersion + "/member/character", async () => {
    return HttpResponse.json({
      characterImageUrl: "/minion4.png",
    });
  }),

  // 캐릭터 등록
  http.post(url + apiVersion + "/member/character/register", () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // 닉네임 변경
  http.patch(url + apiVersion + "/member/nickname", () => {
    return new HttpResponse("ok", { status: 200 });
  }),
];
