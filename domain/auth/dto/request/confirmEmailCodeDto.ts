// 이메일 인증번호 확인 타입 정의 -----------------------------------------------------
export type ConfirmEmailCodeType = {
  emailOtp: string;
};

// 이메일 인증번호 확인 DTO 클래스 -----------------------------------------------------
export class ConfirmEmailCodeRequestDto implements ConfirmEmailCodeType {
  public emailOtp: string;

  constructor(emailOtp: string) {
    this.emailOtp = emailOtp.trim(); // OTP의 앞뒤 공백 제거
  }

  // 객체 형태로 반환
  toObject(): ConfirmEmailCodeType {
    return {
      emailOtp: this.emailOtp,
    };
  }
}
