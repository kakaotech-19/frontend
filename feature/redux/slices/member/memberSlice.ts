import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addMemberExtraReducers } from "./memberExtraReducers";

export interface MemberState {
  // 상태 타입 정의
  loading: boolean;
  error: string | null;
}

const initialState: MemberState = {
  // 초기 상태 값
  loading: false,
  error: null,
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    actionName: (state, action: PayloadAction<MemberState>) => {
      // 상태 업데이트 로직
    },
    // 추가 리듀서
    extraReducers: (builder: any) => addMemberExtraReducers(builder),
  },
});

export const { actionName } = memberSlice.actions;
export default memberSlice.reducer;
