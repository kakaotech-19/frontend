import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { FeedState } from "./feedSlice";
import axiosInstance from "@/utils/lib/axios";
import { ReactionFeedType, UploadFeedType } from "@/utils/types/dto";

// 일기장 불러오기 (무한 스크롤) -----------------------------------------------------
export const fetchFeedEntries = createAsyncThunk(
  "feed/fetchFeedEntries",
  async (params?: number) => {
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
    state.feedList = [...state.feedList, ...action.payload.diaries];
    state.feedAfter = action.payload.after;
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
    const response = await axiosInstance.post("/diary/public/reaction", data);
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

// 나의 공개 일기 불러오기(무한스크롤)  -----------------------------------------------------
export const fetchMyFeedEntries = createAsyncThunk(
  "Feed/fetchMyFeedEntries",
  async (params: number) => {
    const response = await axiosInstance.get(
      `/diary/my/shared?after=${params}`
    );
    return response.data;
  }
);

const addFetchMyFeedEntries = (builder: ActionReducerMapBuilder<FeedState>) => {
  builder.addCase(fetchMyFeedEntries.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(fetchMyFeedEntries.fulfilled, (state, action) => {
    state.myFeedList = [...state.myFeedList, ...action.payload.diaries];
    state.myFeedAfter = action.payload.after;
    state.loading = false;
  });
  builder.addCase(fetchMyFeedEntries.rejected, (state, action) => {
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
  addFetchMyFeedEntries(builder);
};
