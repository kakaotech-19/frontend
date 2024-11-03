import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDiaryExtraReducers } from "./diaryExtraReducers";
import { DiaryResponseType } from "@/utils/types/dto";
import { DEFAULT_DIARY } from "@/utils/constants";

export interface DiaryState {
  date: Date;
  commentView: boolean;
  queriedDiary: DiaryResponseType;
  loading: any;
  error: any;
}

export const initialState = {
  date: new Date(),
  commentView: false,
  quiredDiary: DEFAULT_DIARY,
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
  extraReducers: (builder: any) => addDiaryExtraReducers(builder),
});

export const { setDate, setCommentView } = diarySlice.actions;
export const extraReducers = diarySlice.reducer;
export default diarySlice.reducer;
