## Next JS 가이드

### 기본 규칙

- CSR을 위해서 화면 상단에 'use client' 지시어 사용
- APP 디렉토리 안의 파일이 서비스의 경로가 됨
- layout.tsx 하위 디렉토리 모두에서 공통으로 화면에 그려짐
- page.tsx는 디렉토리마다 반드시 1개씩 존재해야함
- next.config.mjs에서 활성 포트, 환경변수, 빌드 설정 등을 설정할 수 있음

### 라우팅

- loading, error 페이지 커스텀 가능하나 굳이 하지 않음
- 동적 URL 필요할경우 []로 사용하면 가능하지만, shallow routing방식을 사용하고 있기 때문에 굳이 활용하지 않음
- router를 사용할때 next/router는 서버의 라우터임. 반드시 next/navigation을 사용할것
- 쿼리스트링을 페이지에서 받아올 때 useSerchParams()를 사용함

## Redux Chunk 가이드

- dispatch()안에 함수를 넣어야 동작함
- 스토어에서 변수를 불러올땐 selector()를 사용함
- slice는 도메인을 분류함
- extraReducers 파일에서는 비동기 함수의 요청, 응답을 관리함

## 토닥 디렉토리 구조

- Domain: 도메인을 분류하는 최상위 기준

  - components: 도메인의 컴포넌트를 관리하는 파일
  - slices: 전역상태관리에서 사용하는 상태를 관리하는 파일
  - dto: dto
  - hooks: 커스텀 훅
  - functions: 보통 예외처리나 유틸함수가 들어있음
  - types: 타입스크립트 타입, 인터페이스
  - constants: 상수값, enum등

- shared: 여러 도메인에서 공통으로 사용하는 파일
  - axios: http 요청 라이브러리

## 명령어

- `pnpm add --save-dev 패키지`: 개발 의존성 추가
- `pnpm add --save 패키지`: 의존성 추가

### 자주쓰는 명령어

- `pnpm install`: 노드 모듈 설치
- `pnpm dev`: 개발 서버 실행
- `pnpm build`: 프로덕션 빌드
