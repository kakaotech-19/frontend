// 이메일 인증번호 확인 타입 정의 -----------------------------------------------------
export type ConfirmEmailCodeType = {
  emailOtp: string;
};

// 이메일 인증번호 확인 DTO 클래스 -----------------------------------------------------
export class ConfirmEmailCodeRequestDto implements ConfirmEmailCodeType {
  public emailOtp: string;

  constructor(emailOtp: string) {
    if (!this.isValidOtp(emailOtp)) {
      throw new Error("Invalid OTP format.");
    }

    this.emailOtp = emailOtp.trim(); // OTP의 앞뒤 공백 제거
  }

  // OTP 형식 검증 메서드
  private isValidOtp(emailOtp: string): boolean {
    const otpRegex = /^[0-9]{6}$/; // 예시: 6자리 숫자로 구성된 OTP
    return otpRegex.test(emailOtp);
  }

  // 객체 형태로 반환
  toObject(): ConfirmEmailCodeType {
    return {
      emailOtp: this.emailOtp,
    };
  }
}
