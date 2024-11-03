import { ReactionType } from "./feedResponseType";

export type DiaryResponseType = {
  diaryId: number;
  content: string;
  // "publicContent" : "public content",
  webtoonImageUrl: string; // legacy: 이미지 리스트로 변경되어야함
  bgmUrl: string;
  reactionCount: ReactionType; // legacy: 제거 되어야함
  aiComment: string;
  emotion: string;
  date: string;
};
