import { isValidNickname } from "@/domain/shared/function";

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
    if (!isValidNickname(nickname)) {
      throw new Error("Invalid nickname format.");
    }

    this.nickname = nickname.trim(); // 닉네임의 앞뒤 공백 제거
  }

  // 객체 형태로 반환
  toObject(): CheckNicknameDuplicateType {
    return {
      nickname: this.nickname,
    };
  }
}
