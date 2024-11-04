// diaryId 유효성 검증 메서드
const isValidDiaryId = (diaryId: number): boolean => {
  return Number.isInteger(diaryId) && diaryId > 0;
};

export default isValidDiaryId;
