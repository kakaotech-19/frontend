# 토닥토닥 (TodakTodak) : 생성형 AI를 사용한 SNS 일기 공유 서비스 🌙

당신의 하루를 AI 웹툰으로 그려드려요. <br>
다른 사람과 나의 하루를 웹툰으로 공유하고, 다른 사람들의 일상을 구경하세요. <br>
맞춤 장르의 음악과 코멘트로 일상을 위로해드려요. <br>

<div align="start">
<img width="240" alt="스크린샷 2024-11-15 오후 5 20 07" src="https://github.com/user-attachments/assets/99f4a743-8c82-43ad-b172-af32d87d4331">
<img width="240" alt="스크린샷 2024-11-15 오후 5 17 41" src="https://github.com/user-attachments/assets/80665f37-35b1-4c0e-b484-330f7dbb4e1c">
<img width="240" alt="스크린샷 2024-11-15 오후 5 19 50" src="https://github.com/user-attachments/assets/c2d74ac0-df0a-4097-8800-d4faf949177e">
<img width="240" alt="스크린샷 2024-11-15 오후 5 17 49" src="https://github.com/user-attachments/assets/8a92329b-3aee-4517-b125-18744d2700ea">
<img width="240" alt="스크린샷 2024-11-15 오후 5 17 45" src="https://github.com/user-attachments/assets/c9a5bda8-2298-4178-a0df-dc5ce748d722">
<img width="240" alt="스크린샷 2024-11-15 오후 5 28 17" src="https://github.com/user-attachments/assets/821dc998-20ae-47a6-aa22-fa5b9176d4e4">
</div>

## ✨ 주요 기능

### 🎨 AI 웹툰 생성
- 일기 내용을 기반으로 상황에 맞는 일러스트레이션
- 오늘의 감정 상태에 따른 음악 생성

### 📱 소셜 기능
- 친구들과 일기 공유
- 감정표현 소통
- 실시간 알림

### 📅 캘린더
- 월별 일기 관리
- 감정 트래킹

### 🔐 소셜 로그인
- Google
- Kakao
- Naver

## 🛠 기술 스택

### Frontend
```
📦 Next.js 14
📦 TypeScript
📦 Redux Toolkit
📦 TailwindCSS
📦 Flowbite React
```

### 주요 라이브러리
```
📚 @capacitor/core - 모바일 앱 지원
📚 react-calendar - 캘린더 기능
📚 lottie-react - 애니메이션
📚 jwt-decode - 인증
📚 msw - API 모킹
```

## 🚀 시작하기

1️⃣ **저장소 클론**
```bash
git clone [repository-url]
cd todak
```

2️⃣ **의존성 설치**
```bash
pnpm install
```

3️⃣ **환경 변수 설정**
```bash
sh init_environment.sh
```

4️⃣ **개발 서버 실행**
```bash
pnpm dev
```

## 📁 프로젝트 구조

```
📦 todak
 ┣ 📂 app
 ┃ ┣ 📂 (auth)      # 인증 관련
 ┃ ┗ 📂 (main)      # 메인 기능
 ┣ 📂 domain
 ┃ ┣ 📂 auth        # 인증
 ┃ ┣ 📂 diary       # 일기
 ┃ ┣ 📂 feed        # 피드
 ┃ ┣ 📂 member      # 회원
 ┃ ┗ 📂 shared      # 공통
 ┗ 📂 mocks         # API 모킹
```

## 📝 개발 기여 가이드라인

### 컴포넌트 개발
- ✅ CSR을 위한 'use client' 지시어 사용
- ✅ Flowbite React 컴포넌트 활용
- ✅ 페이지별 layout.tsx와 page.tsx 사용 권장

### 라우팅
- ✅ next/navigation 사용
- ✅ 라우트 상수 shared/routes에서 관리
- ✅ 쿼리 파라미터 useSearchParams() 활용

### 상태 관리
- ✅ Redux Toolkit 기반
- ✅ createAsyncThunk로 비동기 처리
- ✅ 도메인별 slice 분리
- ✅ 상태 정규화 권장

## 🔧 명령어

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 개발 서버 실행 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm start` | 프로덕션 서버 실행 |
| `pnpm lint` | 린트 검사 |

## 🤝 기여하기

버그 리포트, 기능 제안, 풀 리퀘스트는 언제나 환영합니다! 
기여하기 전에 프로젝트의 기여 가이드라인을 확인해주세요.

---

<div align="center">
 Made with ❤️ by Team 19, Kakao Tech Bootcamp 1st Generation
</div>
