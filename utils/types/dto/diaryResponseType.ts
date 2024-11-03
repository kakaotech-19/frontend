import { ReactionType } from "./feedResponseType";

export type DiaryResponseType = {
  diaryId: number;
  content: string;
  // "publicContent" : "public content",
  webtoonImageUrl: string;
  bgmUrl: string;
  reactionCount: ReactionType;
  aiComment: string;
  emotion: string;
  date: string;
};
