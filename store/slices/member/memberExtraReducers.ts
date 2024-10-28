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

// 회원 정보 축약 -----------------------------------------------------
export const fetchSummaryMemberInfo = createAsyncThunk(
  "diary/fetchSummaryMemberInfo",
  async (params: any) => {
    const response = await axios.get("/member/summary");
    return response.data;
  }
);

const addFetchSummaryMemberInfo = (
  builder: ActionReducerMapBuilder<MemberState>
) => {
  builder.addCase(fetchSummaryMemberInfo.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(fetchSummaryMemberInfo.fulfilled, (state, action) => {
    state.loading = false;
  });
  builder.addCase(fetchSummaryMemberInfo.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// extra reducers 추가 -----------------------------------------------------
export const addMemberExtraReducers = (
  builder: ActionReducerMapBuilder<MemberState>
) => {
  addFetchMemberInfo(builder);
  addFetchSummaryMemberInfo(builder);
};
