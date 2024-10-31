import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addMemberExtraReducers } from "./memberExtraReducers";

export interface MemberState {
  nickname: string;
  email: string;

  loading: boolean;
  error: string | null;
}

const initialState: MemberState = {
  nickname: "",
  email: "",

  loading: false,
  error: null,
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setEmail: (state: MemberState, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setNickname: (state: MemberState, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    // 추가 리듀서
    extraReducers: (builder: any) => addMemberExtraReducers(builder),
  },
});

export const { setEmail, setNickname } = memberSlice.actions;
export default memberSlice.reducer;
