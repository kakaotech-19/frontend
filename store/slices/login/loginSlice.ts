import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { addSignupExtraReducers } from "./signupExtraReducers";

export interface LoginState {
  email: string;
  password: string;
  isLogin: boolean;
  loading: any;
  error: any;
}

export const initialState = {
  email: "",
  password: "",
  isLogin: false,
  loading: false,
  error: "",
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    setLoginEmail: (state: LoginState, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setLoginPassword: (state: LoginState, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
  //   extraReducers: (builder: any) => addLoginExtraReducers(builder),
});

export const { setLoginEmail, setLoginPassword } = loginSlice.actions;
export const extraReducers = loginSlice.reducer;
export default loginSlice.reducer;
