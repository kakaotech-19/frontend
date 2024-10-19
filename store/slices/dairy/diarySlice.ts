import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { addSignupExtraReducers } from "./signupExtraReducers";

export interface LoginState {
  date: Date;
  loading: any;
  error: any;
}

export const initialState = {
  date: new Date(),
  loading: false,
  error: "",
};

const diarySlice = createSlice({
  name: "diarySlice",
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<Date>) => {
      state.date = action.payload;
    },
  },
  //   extraReducers: (builder: any) => addLoginExtraReducers(builder),
});

export const { setDate } = diarySlice.actions;
export const extraReducers = diarySlice.reducer;
export default diarySlice.reducer;
