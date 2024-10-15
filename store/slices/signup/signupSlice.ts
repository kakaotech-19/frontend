import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addSignupExtraReducers } from "./signupExtraReducers";

export interface SignupState {
  email: string;
  password: string;
  otp: string;
  reEnterPassword: string;
  isVerify: boolean;
  isSignup: boolean;
  loading: any;
  error: any;
}

export const initialState = {
  email: "",
  password: "",
  otp: "",
  reEnterPassword: "",
  isVerify: false,
  isSignup: false,
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
  },
  extraReducers: (builder: any) => addSignupExtraReducers(builder),
});

export const {
  setSignupEmail,
  setSignupPassword,
  setSignupReEnterPassword,
  setOTP,
} = signupSlice.actions;
export const extraReducers = signupSlice.reducer;
export default signupSlice.reducer;
