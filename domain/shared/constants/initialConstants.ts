import { DiaryResponseType } from "@/domain/diary/types/diaryResponseType";
import { MyFeedDetailType } from "@/domain/feed/types/feedResponseType";

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

export const DEFAULT_FEED: MyFeedDetailType = {
  publicDiaryId: 0,
  webtoonImageUrls: [],
  publicContent: "",
  bgmUrl: "",
  reactionCount: DEFAULT_REACTIONS,
  myReaction: [],
  diaryCreatedDate: "",
};
