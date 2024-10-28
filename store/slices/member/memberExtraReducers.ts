import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { MemberState } from "./memberSlice";
import axios from "axios";

// 회원 정보 -----------------------------------------------------
export const fetchMemberInfo = createAsyncThunk(
  "member/fetchMemberInfo",
  async () => {
    const response = await axios.get("/member/detail");
    return response.data;
  }
);

const addFetchMemberInfo = (builder: ActionReducerMapBuilder<MemberState>) => {
  builder.addCase(fetchMemberInfo.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(fetchMemberInfo.fulfilled, (state, action) => {
    state.loading = false;
  });
  builder.addCase(fetchMemberInfo.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// extra reducers 추가 -----------------------------------------------------
export const addMemberExtraReducers = (
  builder: ActionReducerMapBuilder<MemberState>
) => {
  addFetchMemberInfo(builder);
};
