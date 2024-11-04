import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDiaryExtraReducers } from "./diaryExtraReducers";
import { DiaryResponseType, DiaryStatusType } from "@/utils/types/dto";
import { DEFAULT_DIARY } from "@/utils/constants";

export interface DiaryState {
  commentView: boolean;
  queriedDiary: DiaryResponseType;
  diaryStatusList: DiaryStatusType[];
  loading: any;
  error: any;
}

export const initialState = {
  commentView: false,
  queriedDiary: DEFAULT_DIARY,
  diaryStatusList: [],
  loading: false,
  error: "",
};

const diarySlice = createSlice({
  name: "diarySlice",
  initialState,
  reducers: {
    setCommentView: (state, action: PayloadAction<boolean>) => {
      state.commentView = action.payload;
    },
  },
  extraReducers: (builder: any) => addDiaryExtraReducers(builder),
});

export const { setCommentView } = diarySlice.actions;
export const extraReducers = diarySlice.reducer;
export default diarySlice.reducer;
