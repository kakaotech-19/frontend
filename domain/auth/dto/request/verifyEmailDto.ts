import { isValidEmail } from "@/domain/shared/function";

// 이메일 인증 타입 정의 -----------------------------------------------------
export type VerifyEmailType = {
  email: string;
};

// 이메일 인증 DTO 클래스 -----------------------------------------------------
export class VerifyEmailRequestDto implements VerifyEmailType {
  public email: string;

  constructor(email: string) {
    if (!isValidEmail(email)) {
      throw new Error("Invalid email format.");
    }

    this.email = email.trim().toLowerCase(); // 이메일을 소문자로 변환
  }

  // 객체 형태로 반환
  toObject(): VerifyEmailType {
    return {
      email: this.email,
    };
  }
}
