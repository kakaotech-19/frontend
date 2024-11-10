import { isValidEmail } from "@/domain/shared/function";

// 회원가입 타입 정의 -----------------------------------------------------
export type RegisterUserType = {
  email: string;
  nickname: string;
  loginId: string;
  password: string;
};

// 회원가입 DTO 클래스 -----------------------------------------------------
export class RegisterUserRequestDto implements RegisterUserType {
  public email: string;
  public nickname: string;
  public loginId: string;
  public password: string;

  constructor(params: RegisterUserType) {
    const { email, nickname, loginId, password } = params;

    if (!isValidEmail(email))
      throw new Error("이메일 형식이 올바르지 않습니다.");
    if (!nickname) throw new Error("닉네임을 필수로 입력해주세요.");
    if (!loginId) throw new Error("로그인 아이디를 필수로 입력해주세요.");
    if (!password) throw new Error("패스워드가 비어있습니다.");

    this.email = email.trim().toLowerCase();
    this.nickname = nickname.trim();
    this.loginId = loginId.trim();
    this.password = password;
  }

  // 객체 형태로 반환
  toObject(): RegisterUserType {
    return {
      email: this.email,
      nickname: this.nickname,
      loginId: this.loginId,
      password: this.password,
    };
  }
}
