import { HttpResponse, http } from "msw";

const url = process.env.NEXT_PUBLIC_API_URL;
export const diaryMockups = [
  // 나의 일기 상세 조회
  http.get(url + "/diary/my/detail", () => {
    return HttpResponse.json({
      diaryId: 6,
      content: "blah blah",
      // "publicContent" : "public content",
      webtoonImageUrl: "/minion1.png",
      bgmUrl:
        "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
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

  // 연월 일기 작성 현황 확인
  http.get(url + "/diary/my", () => {
    return HttpResponse.json({
      diaryIndexes: [
        {
          diaryId: 6,
          date: "2024-10-17",
        },
        {
          diaryId: 5,
          date: "2024-10-20",
        },
      ],
    });
  }),

  // 나의 일기 작성
  http.post(url + "/diary/my", () => {
    return new HttpResponse("created", { status: 201 });
  }),

  // 일기장 삭제
  http.delete(url + "/diary/my/1", () => {
    return new HttpResponse("ok", { status: 200 });
  }),
];
