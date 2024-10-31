import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addMemberExtraReducers } from "./memberExtraReducers";

export interface MemberState {
  nickname: string;
  email: string;
  characterImageUrl: string;

  loading: boolean;
  error: string | null;
}

const initialState: MemberState = {
  nickname: "",
  email: "",
  characterImageUrl: "",

  loading: false,
  error: null,
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setNickname: (state: MemberState, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
  },
  extraReducers: (builder: any) => addMemberExtraReducers(builder),
});

export const { setNickname } = memberSlice.actions;
export default memberSlice.reducer;
