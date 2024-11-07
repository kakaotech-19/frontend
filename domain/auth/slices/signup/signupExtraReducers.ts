import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { SignupState } from "./signupSlice";
import axiosInstance from "@/domain/shared/axios";
import {
  CheckIdDuplicateRequestDto,
  CheckIdDuplicateType,
  CheckNicknameDuplicateRequestDto,
  CheckNicknameDuplicateType,
  ConfirmEmailCodeRequestDto,
  ConfirmEmailCodeType,
  RegisterUserRequestDto,
  RegisterUserType,
  VerifyEmailRequestDto,
  VerifyEmailType,
} from "../../dto/request";

// 이메일 인증 -----------------------------------------------------
export const verifyEmail = createAsyncThunk(
  "signup/verifyEmail",
  async (data: VerifyEmailType) => {
    const verifyEmailDto = new VerifyEmailRequestDto(data.email);
    const response = await axiosInstance.post(
      "/auth/email",
      verifyEmailDto.toObject()
    );
    return response.data;
  }
);

const addVerifyEmail = (builder: ActionReducerMapBuilder<SignupState>) => {
  builder.addCase(verifyEmail.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(verifyEmail.fulfilled, (state, action) => {
    state.verify.isEmailVerified = true;
    state.loading = false;
  });
  builder.addCase(verifyEmail.rejected, (state, action) => {
    state.verify.isEmailVerified = false;
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// 이메일 인증번호 확인 -----------------------------------------------------
export const confirmEmailCode = createAsyncThunk(
  "signup/confirmEmailCode",
  async (data: ConfirmEmailCodeType) => {
    const confirmEmailCodeDto = new ConfirmEmailCodeRequestDto(data);
    const response = await axiosInstance.post(
      "/auth/email/otp",
      confirmEmailCodeDto.toObject()
    );
    return response.data;
  }
);

const addConfirmEmailCode = (builder: ActionReducerMapBuilder<SignupState>) => {
  builder.addCase(confirmEmailCode.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(confirmEmailCode.fulfilled, (state, action) => {
    state.verify.isOtpVerified = true;
    state.loading = false;
  });
  builder.addCase(confirmEmailCode.rejected, (state, action) => {
    state.verify.isOtpVerified = false;
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// 닉네임 중복 확인 -----------------------------------------------------
export const checkNicknameDuplicate = createAsyncThunk(
  "signup/checkNicknameDuplicate",
  async (data: CheckNicknameDuplicateType) => {
    const checkNickNameDuplicateDto = new CheckNicknameDuplicateRequestDto(
      data.nickname
    );
    const response = await axiosInstance.post(
      "/auth/nickname",
      checkNickNameDuplicateDto.toObject()
    );
    return response.data;
  }
);

const addCheckNicknameDuplicate = (
  builder: ActionReducerMapBuilder<SignupState>
) => {
  builder.addCase(checkNicknameDuplicate.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(checkNicknameDuplicate.fulfilled, (state, action) => {
    state.verify.isNicknameVerified = true;
    state.loading = false;
  });
  builder.addCase(checkNicknameDuplicate.rejected, (state, action) => {
    state.verify.isNicknameVerified = false;
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// ID 중복 확인 -----------------------------------------------------
export const checkIdDuplicate = createAsyncThunk(
  "signup/checkIdDuplicate",
  async (data: CheckIdDuplicateType) => {
    const checkIdDuplicateDto = new CheckIdDuplicateRequestDto(data.loginId);
    const response = await axiosInstance.post(
      "/auth/login-id",
      checkIdDuplicateDto.toObject()
    );
    return response.data;
  }
);

const addcheckIdDuplicate = (builder: ActionReducerMapBuilder<SignupState>) => {
  builder.addCase(checkIdDuplicate.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(checkIdDuplicate.fulfilled, (state, action) => {
    state.verify.isSignupIdVerified = true;
    state.loading = false;
  });
  builder.addCase(checkIdDuplicate.rejected, (state, action) => {
    state.verify.isSignupIdVerified = false;
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// 회원가입 -----------------------------------------------------
export const registerUser = createAsyncThunk(
  "signup/registerUser",
  async (data: RegisterUserType) => {
    const registerUserDto = new RegisterUserRequestDto(data);
    const response = await axiosInstance.post(
      "/auth/signup",
      registerUserDto.toObject()
    );
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
    state.isSignup = false;
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// 회원탈퇴 -----------------------------------------------------
export const deleteAccount = createAsyncThunk(
  "signup/deleteAccount",
  async () => {
    const response = await axiosInstance.post("/auth/deactivate");
    return response.data;
  }
);

const addDeleteAccount = (builder: ActionReducerMapBuilder<SignupState>) => {
  builder.addCase(deleteAccount.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(deleteAccount.fulfilled, (state, action) => {
    state.isSignup = true;
    state.loading = false;
  });
  builder.addCase(deleteAccount.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// extra reducers 추가 -----------------------------------------------------
export const addSignupExtraReducers = (
  builder: ActionReducerMapBuilder<SignupState>
) => {
  addRegisterUser(builder);
  addCheckNicknameDuplicate(builder);
  addcheckIdDuplicate(builder);
  addVerifyEmail(builder);
  addConfirmEmailCode(builder);
  addDeleteAccount(builder);
};
