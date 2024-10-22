import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { addSignupExtraReducers } from "./signupExtraReducers";

export interface DiaryState {
  date: Date;
  commentView: boolean;
  loading: any;
  error: any;
}

export const initialState = {
  date: new Date(),
  commentView: false,
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
    setCommentView: (state, action: PayloadAction<boolean>) => {
      state.commentView = action.payload;
    },
  },
  //   extraReducers: (builder: any) => addLoginExtraReducers(builder),
});

export const { setDate, setCommentView } = diarySlice.actions;
export const extraReducers = diarySlice.reducer;
export default diarySlice.reducer;
