import { createSlice } from "@reduxjs/toolkit";
import { addFeedExtraReducers } from "./feedExtraReducers";
import { FeedType } from "@/utils/types/dto";

export interface FeedState {
  feedList: FeedType[];
  feedAfter: number;
  loading?: boolean;
  error?: string | null;
}

const initialState: FeedState = {
  feedList: [],
  feedAfter: 0,
  loading: false,
  error: null,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => addFeedExtraReducers(builder),
});

export const {} = feedSlice.actions;
export default feedSlice.reducer;
