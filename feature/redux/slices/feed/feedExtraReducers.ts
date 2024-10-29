import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { FeedState } from "./feedSlice";
import axiosInstance from "@/utils/lib/axios";
import { ReactionFeedType, UploadFeedType } from "@/utils/types/dto";

// 일기장 불러오기 (무한 스크롤) -----------------------------------------------------
export const fetchFeedEntries = createAsyncThunk(
  "feed/fetchFeedEntries",
  async (params: number) => {
    const response = await axiosInstance.get(`/diary/public?after=${params}`);
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

// 일기장 반응 이벤트 -----------------------------------------------------

export const reactionFeed = createAsyncThunk(
  "feed/reactionFeed",
  async (data: ReactionFeedType) => {
    const response = await axiosInstance.post("/diary/public/1/reaction", data);
    return response.data;
  }
);

const addReactionFeed = (builder: ActionReducerMapBuilder<FeedState>) => {
  builder.addCase(reactionFeed.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(reactionFeed.fulfilled, (state, action) => {
    state.loading = false;
  });
  builder.addCase(reactionFeed.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// 일기장 공개 업로드 -----------------------------------------------------
export const uploadFeed = createAsyncThunk(
  "Feed/uploadFeed",
  async (data: UploadFeedType) => {
    const response = await axiosInstance.post("/diary/public", data);
    return response.data;
  }
);

const addUploadFeed = (builder: ActionReducerMapBuilder<FeedState>) => {
  builder.addCase(uploadFeed.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(uploadFeed.fulfilled, (state, action) => {
    state.loading = false;
  });
  builder.addCase(uploadFeed.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// extra reducers 추가 -----------------------------------------------------
export const addFeedExtraReducers = (
  builder: ActionReducerMapBuilder<FeedState>
) => {
  addFetchFeedEntries(builder);
  addReactionFeed(builder);
  addUploadFeed(builder);
};
