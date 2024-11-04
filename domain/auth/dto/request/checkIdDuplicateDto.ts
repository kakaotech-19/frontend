// ID 중복 확인 타입 정의 -----------------------------------------------------
export type CheckIdDuplicateType = {
  loginId: string;
};

// ID 중복 확인 DTO 클래스 -----------------------------------------------------
export class CheckIdDuplicateRequestDto implements CheckIdDuplicateType {
  public loginId: string;

  constructor(loginId: string) {
    if (!this.isValidLoginId(loginId)) {
      throw new Error("5 ~ 15자리 영문, 숫자, 한글을 입력해주세요.");
    }

    this.loginId = loginId.trim(); // loginId의 앞뒤 공백 제거
  }

  // loginId 형식 검증 메서드
  private isValidLoginId(loginId: string): boolean {
    const minIdLength = 5;
    const maxIdLength = 20;

    // 최소/최대 길이와 영문 및 숫자로만 구성된 형식 체크
    return (
      loginId.length >= minIdLength &&
      loginId.length <= maxIdLength &&
      /^[a-zA-Z0-9]+$/.test(loginId) // 영문 및 숫자만 허용
    );
  }

  // 객체 형태로 반환
  toObject(): CheckIdDuplicateType {
    return {
      loginId: this.loginId,
    };
  }
}
