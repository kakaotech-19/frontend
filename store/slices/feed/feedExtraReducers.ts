import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { FeedState } from "./feedSlice";
import axios from "axios";

// 일기장 불러오기 (무한 스크롤) -----------------------------------------------------
export const fetchFeedEntries = createAsyncThunk(
  "feed/fetchFeedEntries",
  async (params: number) => {
    const response = await axios.get(`/diary/public?after=${params}`);
    return response.data;
  }
);

const addFetchFeedEntries = (builder: ActionReducerMapBuilder<FeedState>) => {
  builder.addCase(fetchFeedEntries.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(fetchFeedEntries.fulfilled, (state, action) => {
    state.loading = false;
  });
  builder.addCase(fetchFeedEntries.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// extra reducers 추가 -----------------------------------------------------
export const addDiaryExtraReducers = (
  builder: ActionReducerMapBuilder<FeedState>
) => {
  // addLoginUser(builder);
};
