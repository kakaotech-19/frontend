import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginState } from "./loginSlice";
import axiosInstance from "@/domain/shared/lib/axios";
import { LoginUserType } from "@/utils/types/dto";

// 로그인 -----------------------------------------------------
export const loginUser = createAsyncThunk(
  "login/login",
  async (data: LoginUserType) => {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  }
);

const addLoginUser = (builder: ActionReducerMapBuilder<LoginState>) => {
  builder.addCase(loginUser.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(loginUser.fulfilled, (state, action) => {
    state.isLogin = true;
    state.loading = false;
  });
  builder.addCase(loginUser.rejected, (state, action) => {
    state.isLogin = false;
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// 로그아웃 -----------------------------------------------------
export const logoutUser = createAsyncThunk("login/logout", async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
});

const addLogoutUser = (builder: ActionReducerMapBuilder<LoginState>) => {
  builder.addCase(logoutUser.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(logoutUser.fulfilled, (state, action) => {
    state.loading = false;
  });
  builder.addCase(logoutUser.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// extra reducers 추가 -----------------------------------------------------
export const addLoginExtraReducers = (
  builder: ActionReducerMapBuilder<LoginState>
) => {
  addLoginUser(builder);
  addLogoutUser(builder);
};
