import { CHARACTER_STYLE_VALUES } from "@/domain/diary/constants/characterStyle";

// 멀티파트 이미지 전송을 위한 타입 정의
export type CreateCharacterType = {
  image: File; // 멀티파트 이미지 타입으로 File 사용
  characterStyle: string;
};

// DTO 클래스 정의
export class CreateCharacterRequestDto implements CreateCharacterType {
  public image: File;
  public characterStyle: string;

  constructor({ image, characterStyle }: CreateCharacterType) {
    this.image = image;
    this.characterStyle = CHARACTER_STYLE_VALUES[characterStyle];
  }

  // 객체 형태로 반환
  toObject(): CreateCharacterType {
    return {
      image: this.image,
      characterStyle: this.characterStyle,
    };
  }

  // FormData로 변환하는 메서드 추가
  toFormData(): FormData {
    const formData = new FormData();
    formData.append("uploadImage", this.image); // 'image' 필드에 파일 추가
    formData.append("characterStyle", this.characterStyle);
    return formData;
  }
}
