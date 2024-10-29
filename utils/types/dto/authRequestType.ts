// 이메일 인증 -----------------------------------------------------
export type VerifyEmailType = {
  email: string;
};

// 이메일 인증번호 확인 -----------------------------------------------------
export type VerifyEmailCodeType = {
  emailOtp: string;
};

// 닉네임 중복 확인 -----------------------------------------------------
export type CheckNicknameDuplicateType = {
  nickname: string;
};

// ID 중복 확인 -----------------------------------------------------
export type CheckIDDuplicateType = {
  loginId: string;
};
