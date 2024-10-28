import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { DiaryState } from "./diarySlice";
import axios from "axios";

// 나의 일기 상세 조회 -----------------------------------------------------
export const fetchDiaryDetail = createAsyncThunk(
  "diary/fetchDiaryDetail",
  async (params: Date) => {
    const response = await axios.get(
      `/diary/my/detail?date=${params.toISOString()}`
    );
    return response.data;
  }
);

const addFetchDiaryDetail = (builder: ActionReducerMapBuilder<DiaryState>) => {
  builder.addCase(fetchDiaryDetail.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(fetchDiaryDetail.fulfilled, (state, action) => {
    state.loading = false;
  });
  builder.addCase(fetchDiaryDetail.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// extra reducers 추가 -----------------------------------------------------
export const addDiaryExtraReducers = (
  builder: ActionReducerMapBuilder<DiaryState>
) => {
  addFetchDiaryDetail(builder);
};
