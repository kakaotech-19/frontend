import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { extraReducers } from "../signup/signupSlice";
import { addFeedExtraReducers } from "./feedExtraReducers";

export interface FeedState {
  // 상태 타입 정의
  loading?: boolean;
  error?: string | null;
}

const initialState: FeedState = {
  // 초기 상태 값
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
