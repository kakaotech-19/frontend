// 날짜 형식 검증 메서드
const isValidDate = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD 형식
  return dateRegex.test(date);
};

export default isValidDate;
