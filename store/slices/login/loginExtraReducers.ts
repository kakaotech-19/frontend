import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginState } from "./loginSlice";
import axios from "axios";

// 로그인 -----------------------------------------------------
export const loginUser = createAsyncThunk("login/login", async (data: any) => {
  const response = await axios.post("/auth/login", data);
  return response.data;
});

// 로그아웃 -----------------------------------------------------
export const logoutUser = createAsyncThunk("login/logout", async () => {
  const response = await axios.post("/auth/logout");
  return response.data;
});

// extra reducers 추가 -----------------------------------------------------
export const addLoginExtraReducers = (
  builder: ActionReducerMapBuilder<LoginState>
) => {
  // addRegisterUser(builder);
};
