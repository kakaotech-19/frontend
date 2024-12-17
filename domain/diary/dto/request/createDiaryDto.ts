import { isValidDate } from "@/domain/shared/function"; // 일기 작성 타입 정의 -----------------------------------------------------

// 일기 작성 타입 정의 -----------------------------------------------------
export type CreateDiaryEntryType = {
  date: string;
  emotion: string;
  content: string;
  bgmGenre: string;
};

// 일기 작성 요청 DTO 클래스 -----------------------------------------------------
export class CreateDiaryEntryRequestDto implements CreateDiaryEntryType {
  public date: string;
  public emotion: string;
  public content: string;
  public bgmGenre: string;

  // 네임드 파라미터 방식의 생성자
  constructor({ date, emotion, content, bgmGenre }: CreateDiaryEntryType) {
    if (!isValidDate(date)) {
      throw new Error("날짜 포맷이 올바르지 않습니다.");
    }
    if (!emotion) {
      throw new Error("기분을 선택해주세요.");
    }
    if (!content) {
      throw new Error("내용을 입력해주세요.");
    }
    if (!bgmGenre) {
      throw new Error("음악 장르를 선택해주세요.");
    }

    this.date = date;
    this.emotion = this.mapEmotionToEnglish(emotion.trim());
    this.content = content.trim();
    this.bgmGenre = this.mapGenreToEnglish(bgmGenre.trim());
  }

  // 한국어 기분을 영어로 변환하는 메서드
  private mapEmotionToEnglish(emotion: string): string {
    const emotionMap: { [key: string]: string } = {
      행복해요: "happy",
      평온해요: "peaceful",
      생각이많아요: "thoughtful",
      아쉬워요: "regretful",
      씁쓸해요: "bitter",
    };
    return emotionMap[emotion] || emotion; // 매핑되지 않은 경우 원래 값 반환
  }

  // 한국어 장르를 영어로 변환하는 메서드
  private mapGenreToEnglish(genre: string): string {
    const genreMap: { [key: string]: string } = {
      팝: "pop",
      락: "rock",
      어쿠스틱: "acoustic",
      재즈: "jazz",
      클래식: "classical",
      EDM: "edm",
    };
    return genreMap[genre] || genre; // 매핑되지 않은 경우 원래 값 반환
  }

  // 객체 형태로 반환
  toObject(): CreateDiaryEntryType {
    return {
      date: this.date,
      emotion: this.emotion,
      content: this.content,
      bgmGenre: this.bgmGenre,
    };
  }
}
