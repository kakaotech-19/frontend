import { isValidDate } from "@/domain/shared/function";

// 나의 일기 상세 조회 응답 타입 정의 ----------------------------
export type DiaryResponseType = {
  diaryId: number;
  content: string;
  webtoonImageUrls: string[];
  bgmUrl: string;
  aiComment: string;
  emotion: string;
  date: string;
};

// 나의 일기 상세 조회 응답 DTO 클래스 ----------------------------
export class DiaryResponseDto implements DiaryResponseType {
  public diaryId: number;
  public content: string;
  public webtoonImageUrls: string[];
  public bgmUrl: string;
  public aiComment: string;
  public emotion: string;
  public date: string;

  constructor(data: DiaryResponseType) {
    const {
      diaryId,
      content,
      webtoonImageUrls,
      bgmUrl,
      aiComment,
      emotion,
      date,
    } = data;

    if (!isValidDate(date)) {
      throw new Error("유효하지 않은 날짜 형식입니다.");
    }

    this.diaryId = diaryId;
    this.content = content.trim();
    this.webtoonImageUrls = webtoonImageUrls;
    this.bgmUrl = bgmUrl;
    this.aiComment = aiComment;
    this.emotion = emotion;
    this.date = date;
  }

  // 객체 형태로 반환
  toObject(): DiaryResponseType {
    return {
      diaryId: this.diaryId,
      content: this.content,
      webtoonImageUrls: this.webtoonImageUrls,
      bgmUrl: this.bgmUrl,
      aiComment: this.aiComment,
      emotion: this.emotion,
      date: this.date,
    };
  }

  getEmotionDescription(): string {
    const emotionDescriptions: { [key: string]: string } = {
      happy: "오늘은 기분이 좋았던 하루네요!",
      sad: "오늘은 조금 우울했던 것 같아요.",
      angry: "오늘은 화가 나는 일이 있었네요.",
      // 추가 감정 설명
    };
    return emotionDescriptions[this.emotion] || "감정을 설명할 수 없습니다.";
  }
}
