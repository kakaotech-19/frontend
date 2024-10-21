const enum path {
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
  CHARACTER = `${MY}/character`,
}

export default path;
