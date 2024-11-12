// 일기 작성 응답 DTO ----------------------------
export type DiaryWriteResponseType = {
  aiComment: string;
};

// 일기 작성 응답 DTO 클래스 ----------------------------
export class DiaryWriteResponseDto {
  aiComment: string;

  constructor({ aiComment = "this is ai aiComment" }: { aiComment?: string }) {
    this.aiComment = aiComment;
  }

  toObject(): DiaryWriteResponseType {
    return {
      aiComment: this.aiComment,
    };
  }
}
