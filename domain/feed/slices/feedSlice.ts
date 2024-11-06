import { createSlice } from "@reduxjs/toolkit";
import { addFeedExtraReducers } from "./feedExtraReducers";
import {
  FeedType,
  MyFeedDetailType,
  MyFeedType,
} from "../types/feedResponseType";
import { DEFAULT_FEED } from "@/domain/shared/constants";

export interface FeedState {
  feedList: FeedType[];
  feedAfter: number;
  feedEnd?: boolean;
  myFeedList: MyFeedType[];
  myFeedAfter: number;
  myFeedEnd?: boolean;
  selectedFeed: MyFeedDetailType;
  loading?: boolean;
  error?: string | null;
}

const initialState: FeedState = {
  feedList: [],
  feedAfter: 0,
  feedEnd: false,
  myFeedList: [],
  myFeedAfter: 0,
  myFeedEnd: false,
  selectedFeed: DEFAULT_FEED,
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
