import { DiaryResponseType } from "../types/dto";

export const DEFAULT_REACTIONS = {
  like: 0,
  surprised: 0,
  empathize: 0,
  cheering: 0,
};

export const DEFAULT_DIARY: DiaryResponseType = {
  diaryId: 0,
  content: "",
  webtoonImageUrl: "",
  bgmUrl: "",
  reactionCount: DEFAULT_REACTIONS,
  aiComment: "",
  emotion: "",
  date: "",
};
