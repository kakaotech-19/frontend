// 일기 작성 응답 DTO ----------------------------
export type DiaryWriteResponseType = {
  comment: string;
};

// 일기 작성 응답 DTO 클래스 ----------------------------
export class DiaryWriteResponseDto {
  comment: string;

  constructor({ comment = "this is ai comment" }: { comment?: string }) {
    this.comment = comment;
  }

  toObject(): DiaryWriteResponseType {
    return {
      comment: this.comment,
    };
  }
}
