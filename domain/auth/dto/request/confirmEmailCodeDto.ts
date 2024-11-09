// 이메일 인증번호 확인 타입 정의 -----------------------------------------------------
export type ConfirmEmailCodeType = {
  email: string;
  emailOtp: string;
};

// 이메일 인증번호 확인 DTO 클래스 -----------------------------------------------------
export class ConfirmEmailCodeRequestDto implements ConfirmEmailCodeType {
  public email: string;
  public emailOtp: string;

  constructor(params: ConfirmEmailCodeType) {
    if (!params.emailOtp) throw new Error("otp값을 입력해주세요.");
    this.email = params.email;
    this.emailOtp = params.emailOtp.trim(); // OTP의 앞뒤 공백 제거
  }

  // 객체 형태로 반환
  toObject(): ConfirmEmailCodeType {
    return {
      email: this.email,
      emailOtp: this.emailOtp,
    };
  }
}
