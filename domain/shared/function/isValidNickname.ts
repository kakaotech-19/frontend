// 닉네임 형식 검증 메서드
const isValidNickname = (nickname: string): boolean => {
  const minNicknameLength = 3;
  const maxNicknameLength = 15;

  // 최소/최대 길이와 공백 없는 형식 체크 (예: 영문, 숫자, 한글만 허용)
  const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
  return (
    nickname.length >= minNicknameLength &&
    nickname.length <= maxNicknameLength &&
    nicknameRegex.test(nickname)
  );
};

export default isValidNickname;
