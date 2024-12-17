import { isValidDate } from "@/domain/shared/function";

// 일기 삭제 타입 정의 -----------------------------------------------------
export type DeleteDiaryEntryType = {
  date: string;
  id: number;
};

// 일기 삭제 요청 DTO 클래스 -----------------------------------------------------
export class DeleteDiaryEntryRequestDto implements DeleteDiaryEntryType {
  public date: string;
  public id: number;

  // 네임드 파라미터 방식의 생성자
  constructor({ date, id }: DeleteDiaryEntryType) {
    if (!isValidDate(date)) {
      throw new Error("유효하지 않은 날짜 형식입니다.");
    }
    if (!id) {
      throw new Error("일기 ID가 필요합니다.")
    }

    this.date = date;
    this.id = id;
  }

  // 객체 형태로 반환
  toObject(): DeleteDiaryEntryType {
    return {
      date: this.date,
      id: this.id
    };
  }
}
