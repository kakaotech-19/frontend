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
      throw new Error("Username is required.");
    }

    if (!isValidAccessToken(accessToken)) {
      throw new Error("Invalid access token format.");
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
