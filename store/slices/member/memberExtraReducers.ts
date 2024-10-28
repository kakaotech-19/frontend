import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { MemberState } from "./memberSlice";

// extra reducers 추가 -----------------------------------------------------
export const addMemberExtraReducers = (
  builder: ActionReducerMapBuilder<MemberState>
) => {
  // addLogoutUser(builder);
};
