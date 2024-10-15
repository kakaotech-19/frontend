import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { SignupState } from "./signupSlice";
import axios from "axios";

// 회원가입 -----------------------------------------------------
export const postSignup = createAsyncThunk(
  "signup/postSignup",
  async (data: any) => {
    const response = await axios.post("/user/profile", data);
    return response.data;
  }
);

const addPostSignup = (builder: ActionReducerMapBuilder<SignupState>) => {
  builder.addCase(postSignup.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(postSignup.fulfilled, (state, action) => {
    state.isSignup = true;
    state.loading = false;
  });
  builder.addCase(postSignup.rejected, (state, action) => {
    state.isVerify = false;
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// 이메일 OTP 인증 -----------------------------------------------------
export const verifyOTP = createAsyncThunk(
  "signup/verifyOTP",
  async (data: any) => {
    const response = await axios.post("/user/profile", data);
    return response.data;
  }
);

const addVerifyOTP = (builder: ActionReducerMapBuilder<SignupState>) => {
  builder.addCase(verifyOTP.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(verifyOTP.fulfilled, (state, action) => {
    state.isVerify = true;
    state.loading = false;
  });
  builder.addCase(verifyOTP.rejected, (state, action) => {
    state.isVerify = false;
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// extra reducers 추가 -----------------------------------------------------
export const addSignupExtraReducers = (
  builder: ActionReducerMapBuilder<SignupState>
) => {
  addVerifyOTP(builder);
  addPostSignup(builder);
};
