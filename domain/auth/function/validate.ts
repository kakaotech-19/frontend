import { setAlert } from "@/domain/noti/slices/notiSlice";
import { SIGNUP_STEP } from "../constants";
import { setSignupStep } from "../slices/signup/signupSlice";

// 각 단계별 검증 로직을 별도 함수로 분리
const validatePersonalStep = (verify: any) => {
  return verify.isEmailVerified && verify.isOtpVerified;
};

const validateAccountStep = (
  verify: any,
  password: string,
  reEnterPassword: string
) => {
  return (
    verify.isNicknameVerified &&
    verify.isSignupIdVerified &&
    password === reEnterPassword
  );
};

const validatePolicyStep = (verify: any) => {
  return verify.isTermsAgreed && verify.isPrivacyAgreed;
};

// 알림 메시지 상수화
const STEP_ERROR_MESSAGES = {
  [SIGNUP_STEP.PERSONAL]: "이메일을 인증해주세요",
  [SIGNUP_STEP.ACCOUNT]: "입력값을 확인해주세요",
  [SIGNUP_STEP.POLICY]: "전체 약관에 동의해주세요",
} as const;

// 메인 핸들러 함수 단순화
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
  const stepValidators: { [key in SIGNUP_STEP]: () => boolean } = {
    [SIGNUP_STEP.PERSONAL]: () => validatePersonalStep(verify),
    [SIGNUP_STEP.ACCOUNT]: () =>
      validateAccountStep(verify, password, reEnterPassword),
    [SIGNUP_STEP.POLICY]: () => validatePolicyStep(verify),
  };
  const isValid = stepValidators[signupStep]();

  if (!isValid) {
    dispatch(
      setAlert({
        title: "알림",
        message: STEP_ERROR_MESSAGES[signupStep],
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
