const enum path {
  // OAUTH ------------------------------
  OAUTH = "/oauth2/authorization",
  KAKAO = `${OAUTH}/kakao`,
  NAVER = `${OAUTH}/naver`,
  GOOGLE = `${OAUTH}/google`,

  // AUTH ------------------------------
  LOGIN = "/login",
  SIGNUP = "/signup",

  // CONTENTS ------------------------------
  ROOT = "/",
  HOME = "/home",

  // Diary ------------------------------
  DIARY = "/diary",
  WRITE = `${DIARY}/write`,
  READ = `${DIARY}/read`,

  // MY ------------------------------
  MY = "/my",
  SETTING = `${MY}/setting`,
}

export default path;
