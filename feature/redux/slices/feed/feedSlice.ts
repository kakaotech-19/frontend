import { createSlice } from "@reduxjs/toolkit";
import { addFeedExtraReducers } from "./feedExtraReducers";
import { FeedType, MyFeedDetailType, MyFeedType } from "@/utils/types/dto";

export interface FeedState {
  feedList: FeedType[];
  feedAfter: number;
  myFeedList: MyFeedType[];
  myFeedAfter: number;
  selectedFeed: MyFeedDetailType;
  loading?: boolean;
  error?: string | null;
}

const initialState: FeedState = {
  feedList: [],
  feedAfter: 0,
  myFeedList: [],
  myFeedAfter: 0,
  selectedFeed: {
    publicDiaryId: 0,
    webtoonImageUrls: [],
    publicContent: "",
    bgmUrl: "",
    reactionCount: {
      like: 0,
      surprised: 0,
      empathize: 0,
      cheering: 0,
    },
    myReaction: [],
    diaryCreatedDate: "",
  },
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
