import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDiaryExtraReducers } from "./diaryExtraReducers";
import { DEFAULT_DIARY } from "@/domain/shared/constants";
import { DiaryResponseType } from "../dto/response";
import { DiaryStatusType } from "../types";

export interface DiaryState {
  commentView: boolean;
  queriedDiary: DiaryResponseType;
  diaryStatusList: DiaryStatusType[];
  isDiarySaved: boolean;
  aiComment: string;
  loading: any;
  error: any;
}

export const initialState = {
  commentView: false,
  queriedDiary: DEFAULT_DIARY,
  diaryStatusList: [],
  isDiarySaved: false,
  aiComment: "",
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
    clearAiCommet: (state) => {
      state.aiComment = "";
    },
  },
  extraReducers: (builder: any) => addDiaryExtraReducers(builder),
});

export const { clearAiCommet, setCommentView } = diarySlice.actions;
export const extraReducers = diarySlice.reducer;
export default diarySlice.reducer;
