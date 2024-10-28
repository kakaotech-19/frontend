import {
  ActionReducerMapBuilder,
  combineReducers,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { SignupState } from "./signupSlice";
import axios from "axios";

// 이메일 인증 -----------------------------------------------------
export const verifyEmail = createAsyncThunk(
  "signup/verifyEmail",
  async (data: any) => {
    const response = await axios.post("/auth/email", data);
    return response.data;
  }
);

// 이메일 인증번호 확인 -----------------------------------------------------
export const confirmEmailCode = createAsyncThunk(
  "signup/confirmEmailCode",
  async (data: any) => {
    try {
      const response = await axios.post("/auth/email/otp", data);
      return response.data;
    } catch (error) {
      // 에러 핸들링
      throw error;
    }
  }
);

// 닉네임 중복 확인 -----------------------------------------------------
export const checkNicknameDuplicate = createAsyncThunk(
  "signup/checkNicknameDuplicate",
  async (data: any) => {
    const response = await axios.post("/auth/nickname", data);
    return response.data;
  }
);

// ID 중복 확인 -----------------------------------------------------
export const checkIdDuplicate = createAsyncThunk(
  "signup/checkIdDuplicate",
  async (data: any) => {
    const response = await axios.post("/auth/login-id", data);
    return response.data;
  }
);

// 회원가입 -----------------------------------------------------
export const registerUser = createAsyncThunk(
  "signup/registerUser",
  async (data: any) => {
    const response = await axios.post("/auth/signup", data);
    return response.data;
  }
);

const addRegisterUser = (builder: ActionReducerMapBuilder<SignupState>) => {
  builder.addCase(registerUser.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(registerUser.fulfilled, (state, action) => {
    state.isSignup = true;
    state.loading = false;
  });
  builder.addCase(registerUser.rejected, (state, action) => {
    state.isEmailVerified = false;
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// 회원탈퇴 -----------------------------------------------------
export const deleteAccount = createAsyncThunk(
  "signup/deleteAccount",
  async (data: any) => {
    const response = await axios.post("/auth/deactivate", data);
    return response.data;
  }
);

// 토큰 재발급 -----------------------------------------------------
export const reissueToken = createAsyncThunk(
  "signup/reissueToken",
  async (data: any) => {
    const response = await axios.post("/auth/refresh-token", data);
    return response.data;
  }
);

// extra reducers 추가 -----------------------------------------------------
export const addSignupExtraReducers = (
  builder: ActionReducerMapBuilder<SignupState>
) => {
  addRegisterUser(builder);
};
