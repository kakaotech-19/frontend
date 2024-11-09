import { setAlert } from "@/domain/noti/slices/notiSlice";
import { SIGNUP_STEP } from "../constants";
import { setSignupStep } from "../slices/signup/signupSlice";

const PERSONAL_STEP_ERRORS = {
  email: "이메일 인증이 필요합니다",
  otp: "OTP 인증이 필요합니다",
} as const;

const validatePersonalStep = (
  verify: any
): { isValid: boolean; error?: string } => {
  if (!verify.isEmailVerified)
    return { isValid: false, error: PERSONAL_STEP_ERRORS.email };
  if (!verify.isOtpVerified)
    return { isValid: false, error: PERSONAL_STEP_ERRORS.otp };
  return { isValid: true };
};

const ACCOUNT_STEP_ERRORS = {
  nickname: "닉네임 중복 확인이 필요합니다",
  id: "아이디 중복 확인이 필요합니다",
  password: "비밀번호가 일치하지 않습니다",
  passwordSize: "비밀번호 길이는 최소 8자 이상이어야 합니다.",
} as const;

const validateAccountStep = (
  verify: any,
  password: string,
  reEnterPassword: string
): { isValid: boolean; error?: string } => {
  if (!verify.isNicknameVerified)
    return { isValid: false, error: ACCOUNT_STEP_ERRORS.nickname };
  if (!verify.isSignupIdVerified)
    return { isValid: false, error: ACCOUNT_STEP_ERRORS.id };
  if (password !== reEnterPassword)
    return { isValid: false, error: ACCOUNT_STEP_ERRORS.password };
  if (password.length < 8) {
    return { isValid: false, error: ACCOUNT_STEP_ERRORS.passwordSize };
  }
  return { isValid: true };
};

const POLICY_STEP_ERRORS = {
  terms: "서비스 이용약관 동의가 필요합니다",
  privacy: "개인정보 처리방침 동의가 필요합니다",
} as const;

const validatePolicyStep = (
  verify: any
): { isValid: boolean; error?: string } => {
  if (!verify.isTermsAgreed)
    return { isValid: false, error: POLICY_STEP_ERRORS.terms };
  if (!verify.isPrivacyAgreed)
    return { isValid: false, error: POLICY_STEP_ERRORS.privacy };
  return { isValid: true };
};

const handleSwitchSignupStep = ({
  postSignup,
  verify,
  password,
  reEnterPassword,
  signupStep,
  dispatch,
}: {
  postSignup: () => void;
  verify: any;
  password: string;
  reEnterPassword: string;
  signupStep: SIGNUP_STEP;
  dispatch: any;
}) => {
  const stepValidators = {
    [SIGNUP_STEP.PERSONAL]: () => validatePersonalStep(verify),
    [SIGNUP_STEP.ACCOUNT]: () =>
      validateAccountStep(verify, password, reEnterPassword),
    [SIGNUP_STEP.POLICY]: () => validatePolicyStep(verify),
  };

  const validationResult = stepValidators[signupStep]();

  if (!validationResult.isValid) {
    dispatch(
      setAlert({
        title: "알림",
        message: validationResult.error || "",
        color: "info",
      })
    );
    return;
  }

  if (signupStep === SIGNUP_STEP.POLICY) {
    postSignup();
  } else {
    const nextStep =
      signupStep === SIGNUP_STEP.PERSONAL
        ? SIGNUP_STEP.ACCOUNT
        : SIGNUP_STEP.POLICY;
    dispatch(setSignupStep(nextStep));
  }
};

export default handleSwitchSignupStep;
