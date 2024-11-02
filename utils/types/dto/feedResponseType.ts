export type FeedType = {
  publicDiaryId: number;
  diaryId: number;
  characterImageUrl: string;
  nickname: string;
  publicContent: string;
  webtoonImageUrls: [];
  bgmUrl: string;
  date: string;
  reactionCount: {
    like: number; // 좋아요
    surprised: number; // 놀랐어요
    empathize: number; // 공감해요
    cheering: number; // 응원해요
  };
  myReaction: []; // reaction
};
