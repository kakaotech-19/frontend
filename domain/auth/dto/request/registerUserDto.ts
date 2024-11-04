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

    if (!isValidEmail(email)) throw new Error("Invalid email format.");
    if (!nickname) throw new Error("Nickname is required.");
    if (!loginId) throw new Error("Login ID is required.");
    if (!password || password.length < 8)
      throw new Error("Password must be at least 8 characters long.");

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
