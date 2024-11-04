import isValidDiaryId from "@/domain/shared/function/isValidDiaryId";

// 일기장 반응 이벤트 타입 정의 -----------------------------------------------------
export type ReactionFeedType = {
  diaryId: number;
  reactionType: string;
};

// 일기장 반응 이벤트 요청 DTO 클래스 -----------------------------------------------------
export class ReactionFeedRequestDto implements ReactionFeedType {
  public diaryId: number;
  public reactionType: string;

  // 네임드 파라미터 방식의 생성자
  constructor({ diaryId, reactionType }: ReactionFeedType) {
    if (!isValidDiaryId(diaryId)) {
      throw new Error("Invalid diary ID.");
    }
    if (!this.isValidReactionType(reactionType)) {
      throw new Error("Invalid reaction type.");
    }

    this.diaryId = diaryId;
    this.reactionType = reactionType.trim();
  }

  // reactionType 유효성 검증 메서드
  private isValidReactionType(reactionType: string): boolean {
    const validReactions = ["like", "love", "laugh", "sad", "angry"];
    return validReactions.includes(reactionType);
  }

  // 객체 형태로 반환
  toObject(): ReactionFeedType {
    return {
      diaryId: this.diaryId,
      reactionType: this.reactionType,
    };
  }
}
