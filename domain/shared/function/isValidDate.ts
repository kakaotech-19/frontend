// 날짜 형식 포함 여부 검증 메서드
const isValidDate = (text: string): boolean => {
  const dateRegex = /^(\d{4}-\d{2}-\d{2})/; // YYYY-MM-DD 형식으로 시작하는 모든 문자열
  return dateRegex.test(text);
};

export default isValidDate;
