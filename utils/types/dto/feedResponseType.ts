export type ReactionType = {
  like: number;
  surprised: number;
  empathize: number;
  cheering: number;
};

export type FeedType = {
  publicDiaryId: number;
  diaryId: number;
  characterImageUrl: string;
  nickname: string;
  publicContent: string;
  webtoonImageUrls: [];
  bgmUrl: string;
  date: string;
  reactionCount: ReactionType;
  myReaction: []; // reaction
};
