// 로그인 타입 정의 -----------------------------------------------------
export type LoginUserType = {
  loginId: string;
  password: string;
};

// 로그인 DTO 클래스 -----------------------------------------------------
export class LoginUserRequestDto implements LoginUserType {
  public loginId: string;
  public password: string;

  constructor(params: LoginUserType) {
    if (!params.loginId) throw new Error("로그인 아이디를 입력해주세요.");
    if (!params.password) throw new Error("패스워드를 입력해주세요.");

    this.loginId = params.loginId.trim().toLowerCase();
    this.password = params.password;
  }

  toObject(): LoginUserType {
    return {
      loginId: this.loginId,
      password: this.password,
    };
  }
}
