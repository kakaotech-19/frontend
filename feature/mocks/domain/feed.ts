import { HttpResponse, http } from "msw";

const url = process.env.NEXT_PUBLIC_API_URL;
export const feedMockups = [
  // 일기장 불러오기 (무한 스크롤)
  http.get(url + "/diary/public", () => {
    return HttpResponse.json({
      diaries: [
        {
          publicDiaryId: 5, // public diary,
          diaryId: 13, // diary,
          characterImageUrl: "https://s3-url.com", // member
          nickname: "todak", // member
          publicContent: "blah blah", // public diary
          webtoonImageUrls: ["cut1_url", "cur2_url", "cut3_url", "cur4_url"], // diary
          bgmUrl: "https://s3-bgm-url.com", // diary
          date: "2024-09-21", // diary
          reactionCount: {
            // reaction
            like: 0, // 좋아요
            surprised: 0, // 놀랐어요
            empathize: 1, // 공감해요
            cheering: 0, // 응원해요
          },
          myReaction: ["like", "cheering"], // reaction
        },
        {
          publicDiaryId: 4, // public diary,
          diaryId: 11, // diary,
          characterImageUrl: "https://s3-url.com", // member
          nickname: "todak", // member
          publicContent: "blah blah", // public diary
          webtoonImageUrls: ["cut1_url", "cur2_url", "cut3_url", "cur4_url"], // diary
          bgmUrl: "https://s3-bgm-url.com", // diary
          date: "2024-09-21",
          reactionCount: {
            // reaction
            like: 0, // 좋아요
            surprised: 0, // 놀랐어요
            empathize: 1, // 공감해요
            cheering: 0, // 응원해요
          },
          myReaction: ["like", "cheering"], // reaction
        },
        {
          publicDiaryId: 3, // public diary,
          diaryId: 10, // diary,
          characterImageUrl: "https://s3-url.com", // member
          nickname: "todak", // member
          publicContent: "blah blah", // public diary
          webtoonImageUrls: ["cut1_url", "cur2_url", "cut3_url", "cur4_url"], // diary
          bgmUrl: "https://s3-bgm-url.com", // diary
          date: "2024-09-21",
          reactionCount: {
            // reaction
            like: 0, // 좋아요
            surprised: 0, // 놀랐어요
            empathize: 1, // 공감해요
            cheering: 0, // 응원해요
          },
          myReaction: ["like", "cheering"], // reaction
        },
        {
          publicDiaryId: 2, // public diary,
          diaryId: 9, // diary,
          characterImageUrl: "https://s3-url.com", // member
          nickname: "todak", // member
          publicContent: "blah blah", // public diary
          webtoonImageUrls: ["cut1_url", "cur2_url", "cut3_url", "cur4_url"], // diary
          bgmUrl: "https://s3-bgm-url.com", // diary
          date: "2024-09-21",
          reactionCount: {
            // reaction
            like: 0, // 좋아요
            surprised: 0, // 놀랐어요
            empathize: 1, // 공감해요
            cheering: 0, // 응원해요
          },
          myReaction: ["like", "cheering"], // reaction
        },
        {
          publicDiaryId: 1, // public diary,
          diaryId: 8, // diary,
          characterImageUrl: "https://s3-url.com", // member
          nickname: "todak", // member
          publicContent: "blah blah", // public diary
          webtoonImageUrls: ["cut1_url", "cur2_url", "cut3_url", "cur4_url"], // diary
          bgmUrl: "https://s3-bgm-url.com", // diary
          date: "2024-09-21",
          reactionCount: {
            // reaction
            like: 0, // 좋아요
            surprised: 0, // 놀랐어요
            empathize: 1, // 공감해요
            cheering: 0, // 응원해요
          },
          myReaction: ["like", "cheering"], // reaction
        },
      ],
      after: 1,
    });
  }),

  // 일기장 반응 이벤트
  http.post(url + "/diary/public/1/reaction", () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // 일기장 공개 업로드
  http.post(url + "/diary/public", () => {
    return new HttpResponse("created", { status: 201 });
  }),

  // 공개 일기장 삭제
  http.delete(url + "/diary/public", () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // 나의 공개 일기 상세 조회
  http.get(url + "/diary/my/shared/detail", () => {
    return HttpResponse.json({
      publicDiaryId: 3, // public diary
      webtoonImageUrls: ["url-1", "url-2", "url-3", "url-4"], // diary
      publicContent: "this is public String content", // public diary
      bgmUrl: "https://s3-url", // diary
      reactionCount: {
        // reaction
        like: 4,
        surprised: 3,
        empathize: 3,
        cheering: 6,
      },
      myReaction: ["like", "cheering"], // reaction
      diaryCreatedDate: "2024-10-30", // diary
    });
  }),
];
