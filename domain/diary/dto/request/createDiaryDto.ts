import { isValidDate } from "@/domain/shared/function";

// 일기 작성 타입 정의 -----------------------------------------------------
export type CreateDiaryEntryType = {
  date: string;
  emotion: string;
  content: string;
};

// 일기 작성 요청 DTO 클래스 -----------------------------------------------------
export class CreateDiaryEntryRequestDto implements CreateDiaryEntryType {
  public date: string;
  public emotion: string;
  public content: string;

  // 네임드 파라미터 방식의 생성자
  constructor({ date, emotion, content }: CreateDiaryEntryType) {
    if (!isValidDate(date)) {
      throw new Error("Invalid date format. Expected format: YYYY-MM-DD.");
    }
    if (!emotion) {
      throw new Error("Emotion is required.");
    }
    if (!content) {
      throw new Error("Content is required.");
    }

    this.date = date;
    this.emotion = emotion.trim();
    this.content = content.trim();
  }

  // 객체 형태로 반환
  toObject(): CreateDiaryEntryType {
    return {
      date: this.date,
      emotion: this.emotion,
      content: this.content,
    };
  }
}
