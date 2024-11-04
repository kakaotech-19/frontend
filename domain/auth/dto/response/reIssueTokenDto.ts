import { isValidAccessToken } from "@/domain/shared/function";

// 토큰 재발급 응답 타입 정의 -----------------------------------------------------
export type ReIssueTokenType = {
  accessToken: string;
};

// 토큰 재발급 응답 DTO 클래스 -----------------------------------------------------
export class ReIssueTokenResponseDto implements ReIssueTokenType {
  public accessToken: string;

  constructor({ accessToken }: ReIssueTokenType) {
    if (!isValidAccessToken(accessToken)) {
      throw new Error("Invalid access token format.");
    }

    this.accessToken = accessToken;
  }

  // 객체 형태로 반환
  toObject(): ReIssueTokenType {
    return {
      accessToken: this.accessToken,
    };
  }
}
