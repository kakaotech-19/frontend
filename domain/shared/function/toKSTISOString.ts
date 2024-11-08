const toKSTISOString = (date: Date): string => {
  // KST 타임존 오프셋 (+9시간)
  const KST_OFFSET = 9 * 60 * 60 * 1000;

  // UTC 시간에 +9시간을 더한 KST 시간 생성
  const kstDate = new Date(date.getTime() + KST_OFFSET);

  // KST 시간에 대한 ISO 포맷 문자열 반환 (초 마지막의 'Z'를 제거하여 로컬 시간처럼 보이게 함)
  return kstDate.toISOString().replace("Z", "");
};

export default toKSTISOString;
