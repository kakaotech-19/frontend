import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addSignupExtraReducers } from "./signupExtraReducers";

export interface SignupState {
  email: string;
  nickname: string;
  signupId: string;
  password: string;
  reEnterPassword: string;
  otp: string;
  isSignup: boolean;
  verify: {
    isEmailVerified: boolean;
    isOtpVerified: boolean;
    isNicknameVerified: boolean;
    isSignupIdVerified: boolean;
    isTermsAgreed: boolean;
    isPrivacyAgreed: boolean;
  };
  loading: any;
  error: any;
}

export const initialState = {
  email: "",
  nickname: "",
  signupId: "",
  password: "",
  otp: "",
  reEnterPassword: "",
  isSignup: false,
  verify: {
    isEmailVerified: false,
    isOtpVerified: false,
    isNicknameVerified: false,
    isSignupIdVerified: false,
    isTermsAgreed: false,
    isPrivacyAgreed: false,
  },
  loading: false,
  error: "",
};

const signupSlice = createSlice({
  name: "signupSlice",
  initialState,
  reducers: {
    setSignupEmail: (state: SignupState, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setSignupNickname: (state: SignupState, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    setSignupId: (state: SignupState, action: PayloadAction<string>) => {
      state.signupId = action.payload;
    },
    setSignupPassword: (state: SignupState, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setSignupReEnterPassword: (
      state: SignupState,
      action: PayloadAction<string>
    ) => {
      state.reEnterPassword = action.payload;
    },
    setOTP: (state: SignupState, action: PayloadAction<string>) => {
      state.otp = action.payload;
    },

    // verify state --------------------------------
    setIsEmailVerified: (
      state: SignupState,
      action: PayloadAction<boolean>
    ) => {
      state.verify.isEmailVerified = action.payload;
    },
    setIsOtpVerified: (state: SignupState, action: PayloadAction<boolean>) => {
      state.verify.isOtpVerified = action.payload;
    },
    setIsNicknameVerified: (
      state: SignupState,
      action: PayloadAction<boolean>
    ) => {
      state.verify.isNicknameVerified = action.payload;
    },
    setIsSignupIdVerified: (
      state: SignupState,
      action: PayloadAction<boolean>
    ) => {
      state.verify.isSignupIdVerified = action.payload;
    },
    setIsTermsAgreed: (state: SignupState, action: PayloadAction<boolean>) => {
      state.verify.isTermsAgreed = action.payload;
    },
    setIsPrivacyAgreed: (
      state: SignupState,
      action: PayloadAction<boolean>
    ) => {
      state.verify.isPrivacyAgreed = action.payload;
    },

    // all reset --------------------------------
    resetSignupState: () => initialState,
  },
  extraReducers: (builder: any) => addSignupExtraReducers(builder),
});

export const {
  setSignupEmail,
  setSignupNickname,
  setSignupId,
  setSignupPassword,
  setSignupReEnterPassword,
  setOTP,
  setIsEmailVerified,
  setIsOtpVerified,
  setIsNicknameVerified,
  setIsSignupIdVerified,
  setIsTermsAgreed,
  setIsPrivacyAgreed,
  resetSignupState,
} = signupSlice.actions;
export const extraReducers = signupSlice.reducer;
export default signupSlice.reducer;
