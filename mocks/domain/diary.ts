import { HttpResponse, http } from "msw";

const url = process.env.NEXT_PUBLIC_API_URL;
export const diaryMockups = [
  // 이메일 인증
  //   http.post(url + "/auth/email", () => {
  //     return new HttpResponse("No Content", { status: 204 });
  //   }),

  // 나의 일기 상세 조회
  http.get(url + "/diary/my/detail?date=2024-10-07", () => {
    return new HttpResponse.JSON({
      diaryId: 6,
      content: "blah blah",
      // "publicContent" : "public content",
      webtoonImageUrl: "https://s3-url.com",
      bgmUrl: "https://s3-url.com",
      reactionCount: {
        like: 0,
        surprised: 0,
        empathize: 1,
        cheering: 0,
      },
      aiComment: "good good",
      emotion: "JOY",
      date: "2024-10-17",
    });
  }),
];
