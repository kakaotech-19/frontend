// 닉네임 중복 확인 타입 정의 -----------------------------------------------------
export type CheckNicknameDuplicateType = {
  nickname: string;
};

// 닉네임 중복 확인 DTO 클래스 -----------------------------------------------------
export class CheckNicknameDuplicateRequestDto
  implements CheckNicknameDuplicateType
{
  public nickname: string;

  constructor(nickname: string) {
    if (!this.isValidNickname(nickname)) {
      throw new Error("Invalid nickname format.");
    }

    this.nickname = nickname.trim(); // 닉네임의 앞뒤 공백 제거
  }

  // 닉네임 형식 검증 메서드
  private isValidNickname(nickname: string): boolean {
    const minNicknameLength = 3;
    const maxNicknameLength = 15;

    // 최소/최대 길이와 공백 없는 형식 체크
    return (
      nickname.length >= minNicknameLength &&
      nickname.length <= maxNicknameLength &&
      /^[a-zA-Z0-9가-힣]+$/.test(nickname) // 영문, 숫자, 한글로만 구성
    );
  }

  // 객체 형태로 반환
  toObject(): CheckNicknameDuplicateType {
    return {
      nickname: this.nickname,
    };
  }
}
