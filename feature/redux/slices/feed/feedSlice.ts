import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addFeedExtraReducers } from "./feedExtraReducers";
import { FeedType } from "@/utils/types/dto";

export interface FeedState {
  feedList: FeedType[];
  loading?: boolean;
  error?: string | null;
}

const initialState: FeedState = {
  feedList: [],
  loading: false,
  error: null,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    actionName: (state, action: PayloadAction<FeedState>) => {
      // 상태 업데이트 로직
    },
    // 추가 리듀서
    extraReducers: (builder: any) => addFeedExtraReducers(builder),
  },
});

export const { actionName } = feedSlice.actions;
export default feedSlice.reducer;
