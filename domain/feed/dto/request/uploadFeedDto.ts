import isValidDiaryId from "@/domain/shared/function/isValidDiaryId";

// 일기장 공개 업로드 타입 정의 -----------------------------------------------------
export type UploadFeedType = {
  diaryId: number;
  publicContent: string;
};

// 일기장 공개 업로드 요청 DTO 클래스 -----------------------------------------------------
export class UploadFeedRequestDto implements UploadFeedType {
  public diaryId: number;
  public publicContent: string;

  // 네임드 파라미터 방식의 생성자
  constructor({ diaryId, publicContent }: UploadFeedType) {
    if (!isValidDiaryId(diaryId)) {
      throw new Error("유효하지 않은 일기장 ID입니다.");
    }
    if (!this.isValidPublicContent(publicContent)) {
      throw new Error("컨텐츠 게시글은 500자 이내로 작성해주세요.");
    }

    this.diaryId = diaryId;
    this.publicContent = publicContent.trim();
  }

  // publicContent 유효성 검증 메서드 (예: 최대 500자 제한)
  private isValidPublicContent(publicContent: string): boolean {
    const maxContentLength = 500;
    return (
      publicContent.length >= 0 && publicContent.length <= maxContentLength
    );
  }

  // 객체 형태로 반환
  toObject(): UploadFeedType {
    return {
      diaryId: this.diaryId,
      publicContent: this.publicContent,
    };
  }
}
