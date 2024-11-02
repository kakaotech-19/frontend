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
  reducers: {},
  extraReducers: (builder: any) => addFeedExtraReducers(builder),
});

export const {} = feedSlice.actions;
export default feedSlice.reducer;
