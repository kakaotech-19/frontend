import isValidAccessToken from "@/domain/shared/function/isValidAccessToken";

// 로그인 응답 타입 정의 -----------------------------------------------------
export type LoginResponseType = {
  username: string;
  accessToken: string;
};

// 로그인 응답 DTO 클래스 -----------------------------------------------------
export class LoginResponseDto implements LoginResponseType {
  public username: string;
  public accessToken: string;

  constructor(data: LoginResponseType) {
    const { username, accessToken } = data;

    if (!username) {
      throw new Error("유저 이름이 없습니다.");
    }

    if (!isValidAccessToken(accessToken)) {
      throw new Error("유효하지 않은 엑세스 토큰입니다.");
    }

    this.username = username;
    this.accessToken = accessToken;
  }

  // 객체 형태로 반환
  toObject(): LoginResponseType {
    return {
      username: this.username,
      accessToken: this.accessToken,
    };
  }
}
