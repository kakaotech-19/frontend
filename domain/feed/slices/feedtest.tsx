import axiosInstance from "@/domain/shared/axios";
import createCustomAsyncThunk from "@/domain/shared/redux/createCustomAsyncThunk";
import { ActionReducerMapBuilder, asyncThunkCreator } from "@reduxjs/toolkit";

// 팔로우 조회 -----------------------------------------------------
export const followQuery = createCustomAsyncThunk(
  "namespace/followQuery",
  async (data: any) => {
    const response = await axiosInstance.post("");
    return response.data;
  }
);

const functionName = (builder: ActionReducerMapBuilder<StateType>) => {
  builder.addCase(asyncThunk.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(asyncThunk.fulfilled, (state, action) => {
    state.loading = false;
  });
  builder.addCase(asyncThunk.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};
