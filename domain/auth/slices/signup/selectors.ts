import { RootState } from "@/redux";

export const selectSignupState = (state: RootState) => ({
  email: state.signup.email,
  nickname: state.signup.nickname,
  signupId: state.signup.signupId,
  password: state.signup.password,
  verify: state.signup.verify,
  step: state.signup.step,
  reEnterPassword: state.signup.reEnterPassword,
  isSignup: state.signup.isSignup,
});
