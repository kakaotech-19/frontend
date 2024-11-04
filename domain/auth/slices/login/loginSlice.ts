import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addLoginExtraReducers } from "./loginExtraReducers";

export interface LoginState {
  loginId: string;
  password: string;
  isLogin: boolean;
  isIdLoginFormView: boolean;
  loading: any;
  error: any;
}

export const initialState = {
  password: "",
  loginId: "",
  isLogin: false,
  isIdLoginFormView: false,
  loading: false,
  error: "",
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    setLoginId: (state: LoginState, action: PayloadAction<string>) => {
      state.loginId = action.payload;
    },
    setLoginPassword: (state: LoginState, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setIsIdLoginFormView: (
      state: LoginState,
      action: PayloadAction<boolean>
    ) => {
      state.isIdLoginFormView = action.payload;
    },
    resetLoginState: () => initialState,
  },
  extraReducers: (builder: any) => addLoginExtraReducers(builder),
});

export const {
  setLoginId,
  setLoginPassword,
  setIsIdLoginFormView,
  resetLoginState,
} = loginSlice.actions;
export const extraReducers = loginSlice.reducer;
export default loginSlice.reducer;
