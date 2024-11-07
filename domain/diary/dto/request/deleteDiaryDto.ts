import { isValidDate } from "@/domain/shared/function";

// 일기 삭제 타입 정의 -----------------------------------------------------
export type DeleteDiaryEntryType = {
  date: string;
  emotion: string;
  content: string;
};

// 일기 삭제 요청 DTO 클래스 -----------------------------------------------------
export class DeleteDiaryEntryRequestDto implements DeleteDiaryEntryType {
  public date: string;
  public emotion: string;
  public content: string;

  // 네임드 파라미터 방식의 생성자
  constructor({ date, emotion, content }: DeleteDiaryEntryType) {
    if (!isValidDate(date)) {
      throw new Error("유효하지 않은 날짜 형식입니다.");
    }
    if (!emotion) {
      throw new Error("감정표현 내용이 필요합니다.");
    }
    if (!content) {
      throw new Error("일기 내용이 필요합니다.");
    }

    this.date = date;
    this.emotion = emotion.trim();
    this.content = content.trim();
  }

  // 객체 형태로 반환
  toObject(): DeleteDiaryEntryType {
    return {
      date: this.date,
      emotion: this.emotion,
      content: this.content,
    };
  }
}
