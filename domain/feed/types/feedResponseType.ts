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
  createdDate: string;
  reactionCount: ReactionType;
  myReaction: []; // reaction
};

export type MyFeedType = {
  publicDiaryId: number;
  webtoonImageUrl: string;
  createdDate: string;
};

export type MyFeedDetailType = {
  publicDiaryId: number; // public diary
  webtoonImageUrls: []; // diary
  publicContent: string; // public diary
  bgmUrl: string; // diary
  reactionCount: ReactionType;
  myReaction: []; // reaction
  diaryCreatedDate: string; // diary
};
