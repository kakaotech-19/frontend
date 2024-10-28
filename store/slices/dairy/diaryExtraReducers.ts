import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { DiaryState } from "./diarySlice";

// extra reducers 추가 -----------------------------------------------------
export const addDiaryExtraReducers = (
  builder: ActionReducerMapBuilder<DiaryState>
) => {
  // addLoginUser(builder);
};
