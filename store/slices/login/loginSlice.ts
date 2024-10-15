import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { addSignupExtraReducers } from "./signupExtraReducers";

export interface LoginState {
  loginId: string;
  password: string;
  isLogin: boolean;
  loading: any;
  error: any;
}

export const initialState = {
  password: "",
  loginId: "",
  isLogin: false,
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
  },
  //   extraReducers: (builder: any) => addLoginExtraReducers(builder),
});

export const { setLoginId, setLoginPassword } = loginSlice.actions;
export const extraReducers = loginSlice.reducer;
export default loginSlice.reducer;
