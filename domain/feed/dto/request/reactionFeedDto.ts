import isValidDiaryId from "@/domain/shared/function/isValidDiaryId";

// 일기장 반응 이벤트 타입 정의 -----------------------------------------------------
export type ReactionFeedType = {
  publicDiaryId: number;
  reactionType: string;
};

// 일기장 반응 이벤트 요청 DTO 클래스 -----------------------------------------------------
export class ReactionFeedRequestDto implements ReactionFeedType {
  public publicDiaryId: number;
  public reactionType: string;

  // 네임드 파라미터 방식의 생성자
  constructor({ publicDiaryId, reactionType }: ReactionFeedType) {
    if (!isValidDiaryId(publicDiaryId)) {
      throw new Error("유효하지 않은 다이어리 아이디입니다.");
    }

    this.publicDiaryId = publicDiaryId;
    this.reactionType = reactionType.trim();
  }

  // 객체 형태로 반환
  toObject(): ReactionFeedType {
    return {
      publicDiaryId: this.publicDiaryId,
      reactionType: this.reactionType,
    };
  }
}
