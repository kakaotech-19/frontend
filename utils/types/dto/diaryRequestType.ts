// 일기 작성 -----------------------------------------------------
export type CreateDiaryEntryType = {
  date: string;
  emotion: string;
  content: string;
};

// 일기 삭제 -----------------------------------------------------
export type deleteDiaryEntryType = {
  diaryId: number;
};
