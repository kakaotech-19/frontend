import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addMemberExtraReducers } from "./memberExtraReducers";

export interface MemberState {
  nickname: string;
  email: string;
  characterImageUrl: string;
  isCreateCharacter: boolean;
  isRegisterCharacter: boolean;
  selectedFile: string;
  loading: boolean;
  error: string | null;
}

const initialState: MemberState = {
  nickname: "",
  email: "",
  characterImageUrl: "",
  isCreateCharacter: false,
  isRegisterCharacter: false,
  selectedFile: "",
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
    setSelectedFile: (state: MemberState, action: PayloadAction<string>) => {
      state.selectedFile = action.payload;
    },
    clearCharacter: (state: MemberState) => {
      state.isCreateCharacter = false;
      state.isRegisterCharacter = false;
    },
  },
  extraReducers: (builder: any) => addMemberExtraReducers(builder),
});

export const { setNickname, setSelectedFile, clearCharacter } =
  memberSlice.actions;
export default memberSlice.reducer;
