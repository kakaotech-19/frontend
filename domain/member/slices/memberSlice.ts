import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addMemberExtraReducers } from "./memberExtraReducers";

export interface MemberState {
  profile: {
    nickname: string;
    email: string;
    tempCharacterUrl: string;
    characterImageUrl: string;
  };
  characterCreate: {
    memberImageFile: File | null; // 미리보기
    createdCharacterUrl: string; // 미리보기
    isCreateCharacter: boolean; // 생성되었는가
    isRegisterCharacter: boolean; // 등록했는가
  };
  loading: boolean;
  error: string | null;
}

const initialState: MemberState = {
  profile: {
    nickname: "",
    email: "",
    tempCharacterUrl: "",
    characterImageUrl: "",
  },
  characterCreate: {
    memberImageFile: null,
    createdCharacterUrl: "",
    isCreateCharacter: false,
    isRegisterCharacter: false,
  },
  loading: false,
  error: null,
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setNickname: (state: MemberState, action: PayloadAction<string>) => {
      state.profile.nickname = action.payload;
    },
    clearCharacter: (state: MemberState) => {
      state.characterCreate.createdCharacterUrl = "";
      state.characterCreate.isCreateCharacter = false;
      state.characterCreate.isRegisterCharacter = false;
    },
    setMemberImageFile: (state: MemberState, action: PayloadAction<File>) => {
      state.characterCreate.memberImageFile = action.payload;
    },
    clearRegister: (state: MemberState) => {
      state.characterCreate.isCreateCharacter = false;
      state.characterCreate.isRegisterCharacter = false;
    },
  },
  extraReducers: (builder: any) => addMemberExtraReducers(builder),
});

export const {
  setNickname,
  setMemberImageFile,
  clearCharacter,
  clearRegister,
} = memberSlice.actions;
export default memberSlice.reducer;
