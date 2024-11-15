// 서버의 URL, 정적변수이기 때문에 url포트 뒤의 /api/v1은 고정이다.
export const url = process.env.NEXT_PUBLIC_API_URL;

// 백엔드와 협업을 위해 띄우는 임시 서버. 유효값은 "enabled" 그외엔 활성화되지 않는다.
export const mocking = process.env.NEXT_PUBLIC_API_MOCKING;

// 고정문자열로 추가해야한다.
export const apiVersion = "/api/v1";
