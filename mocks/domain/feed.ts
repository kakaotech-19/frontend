import { HttpResponse, http } from "msw";

const url = process.env.NEXT_PUBLIC_API_URL;
export const feedMockups = [
  // 일기장 불러오기 (무한 스크롤)
  http.get(url + "/diary/public?after=5", () => {
    return new HttpResponse.JSON({
      diaries: [
        {
          publicId: 5, // public diary
          characterImageUrl: "https://s3-url.com", // member
          nickname: "todak", // member
          publicContent: "blah blah", // public diary
          webtoonImageUrl: "https://s3-url.com", // diary
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
          publicId: 4, // public diary
          characterImageUrl: "https://s3-url.com", // member
          nickname: "todak", // member
          publicContent: "blah blah", // public diary
          webtoonImageUrl: "https://s3-url.com", // diary
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
          publicId: 3, // public diary
          characterImageUrl: "https://s3-url.com", // member
          nickname: "todak", // member
          publicContent: "blah blah", // public diary
          webtoonImageUrl: "https://s3-url.com", // diary
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
          publicId: 2, // public diary
          characterImageUrl: "https://s3-url.com", // member
          nickname: "todak", // member
          publicContent: "blah blah", // public diary
          webtoonImageUrl: "https://s3-url.com", // diary
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
          publicId: 1, // public diary
          characterImageUrl: "https://s3-url.com", // member
          nickname: "todak", // member
          publicContent: "blah blah", // public diary
          webtoonImageUrl: "https://s3-url.com", // diary
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
    return new HttpResponse("No Content", { status: 204 });
  }),
];
