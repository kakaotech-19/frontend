// 일기장 반응 이벤트 -----------------------------------------------------
export type ReactionFeedType = {
  diaryId: number;
  reactionType: string;
};

// 일기장 공개 업로드 -----------------------------------------------------
export type UploadFeedType = {
  diaryId: number;
  publicContent: string;
};
