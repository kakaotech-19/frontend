// 캐릭터 생성 타입 정의 -----------------------------------------------------
export type CreateCharacterType = {
  image: string;
};

// 캐릭터 생성 요청 DTO 클래스 -----------------------------------------------------
export class CreateCharacterRequestDto implements CreateCharacterType {
  public image: string;

  // 네임드 파라미터 방식의 생성자
  constructor({ image }: CreateCharacterType) {
    if (!this.isValidBase64Image(image)) {
      throw new Error("Invalid image format. Expected Base64 encoded string.");
    }

    this.image = image.trim();
  }

  // Base64 이미지 형식 검증 메서드
  private isValidBase64Image(image: string): boolean {
    // 이미지의 MIME 타입이 포함된 Base64 형식의 시작 부분 예시: data:image/png;base64, 또는 data:image/jpeg;base64,
    const base64Regex =
      /^data:image\/(png|jpeg|jpg);base64,[A-Za-z0-9+/]+={0,2}$/;
    return base64Regex.test(image);
  }

  // 객체 형태로 반환
  toObject(): CreateCharacterType {
    return {
      image: this.image,
    };
  }
}
