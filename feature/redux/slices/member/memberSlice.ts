import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addMemberExtraReducers } from "./memberExtraReducers";

export interface MemberState {
  nickname: string;
  email: string;
  characterImageUrl: string;

  selectedFile: File | null;
  loading: boolean;
  error: string | null;
}

const initialState: MemberState = {
  nickname: "",
  email: "",
  characterImageUrl: "",

  selectedFile: null,
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
    setSelectedFile: (state: MemberState, action: PayloadAction<File>) => {
      state.selectedFile = action.payload;
    },
  },
  extraReducers: (builder: any) => addMemberExtraReducers(builder),
});

export const { setNickname, setSelectedFile } = memberSlice.actions;
export default memberSlice.reducer;
