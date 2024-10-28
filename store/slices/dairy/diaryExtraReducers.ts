import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { DiaryState } from "./diarySlice";
import axios from "axios";

// 일기장 불러오기 (무한 스크롤) -----------------------------------------------------
export const fetchDiaryEntries = createAsyncThunk(
  "diary/fetchDiaryEntries",
  async (params: any) => {
    const response = await axios.get("/api/endpoint", { params: params });
    return response.data;
  }
);

const addFetchDiaryEntries = (builder: ActionReducerMapBuilder<DiaryState>) => {
  builder.addCase(fetchDiaryEntries.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(fetchDiaryEntries.fulfilled, (state, action) => {
    state.loading = false;
  });
  builder.addCase(fetchDiaryEntries.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// GET
// GET
// 일기장 팝업 X
// POST
// 일기장 반응 이벤트
// POST
// 일기장 공개 업로드

// extra reducers 추가 -----------------------------------------------------
export const addDiaryExtraReducers = (
  builder: ActionReducerMapBuilder<DiaryState>
) => {
  // addLoginUser(builder);
};
