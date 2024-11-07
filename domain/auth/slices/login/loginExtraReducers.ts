import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { LoginState } from "./loginSlice";
import axiosInstance from "@/domain/shared/axios";
import { LoginUserRequestDto, LoginUserType } from "@/domain/auth/dto/request";
import { LoginResponseDto, LoginResponseType } from "../../dto/response";
import {
  ReIssueTokenResponseDto,
  ReIssueTokenType,
} from "../../dto/response/reIssueTokenDto";

// 로그인 -----------------------------------------------------
export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (data: LoginUserType) => {
    const loginUserDto = new LoginUserRequestDto(data);
    const response = await axiosInstance.post(
      "/auth/login",
      loginUserDto.toObject()
    );
    const responseData = new LoginResponseDto(response.data);
    return responseData.toObject();
  }
);

const addLoginUser = (builder: ActionReducerMapBuilder<LoginState>) => {
  builder.addCase(loginUser.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(
    loginUser.fulfilled,
    (state, action: PayloadAction<LoginResponseType>) => {
      // 서버사이드에서는 localStorage에 접근할 수 없으므로 반환
      if (typeof window === "undefined") {
        return;
      }
      localStorage.setItem("accessToken", action.payload.accessToken);
      state.isLogin = true;
      state.loading = false;
    }
  );
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
    state.isLogin = false;
    localStorage.removeItem("accessToken");
    state.loading = false;
  });
  builder.addCase(logoutUser.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// 토큰 재발급 -----------------------------------------------------
export const reissueToken = createAsyncThunk(
  "signup/reissueToken",
  async () => {
    const response = await axiosInstance.post("/auth/refresh-token");
    const responseData = new ReIssueTokenResponseDto(response.data);
    return responseData.toObject();
  }
);

const addReissueToken = (builder: ActionReducerMapBuilder<LoginState>) => {
  builder.addCase(reissueToken.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(
    reissueToken.fulfilled,
    (state, action: PayloadAction<ReIssueTokenType>) => {
      localStorage.setItem("accessToken", action.payload.accessToken);
      state.loading = false;
    }
  );
  builder.addCase(reissueToken.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message ?? "";
  });
};

// extra reducers 추가 -----------------------------------------------------
export const addLoginExtraReducers = (
  builder: ActionReducerMapBuilder<LoginState>
) => {
  addLoginUser(builder);
  addLogoutUser(builder);
  addReissueToken(builder);
};
