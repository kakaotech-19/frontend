import { isValidNickname } from "@/domain/shared/function";

// 닉네임 변경 타입 정의 -----------------------------------------------------
export type ChangeNicknameType = {
  nickname: string;
};

// 닉네임 변경 요청 DTO 클래스 -----------------------------------------------------
export class ChangeNicknameRequestDto implements ChangeNicknameType {
  public nickname: string;

  // 네임드 파라미터 방식의 생성자
  constructor({ nickname }: ChangeNicknameType) {
    if (!isValidNickname(nickname)) {
      throw new Error("Invalid nickname format.");
    }

    this.nickname = nickname.trim();
  }

  // 객체 형태로 반환
  toObject(): ChangeNicknameType {
    return {
      nickname: this.nickname,
    };
  }
}
