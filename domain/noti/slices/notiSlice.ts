import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertType } from "../types";
import { INIT_ALERT } from "@/domain/shared/constants";

export interface NotiState {
  alert: AlertType;
  loading: boolean;
  error: string | null;
}

const initialState: NotiState = {
  alert: INIT_ALERT,
  loading: false,
  error: null,
};

const notiSlice = createSlice({
  name: "noti",
  initialState,
  reducers: {
    setAlert: (state: NotiState, action: PayloadAction<AlertType>) => {
      state.alert = action.payload;
    },
    clearAlert: (state: NotiState) => {
      state.alert = INIT_ALERT;
    },
  },
  //   extraReducers: (builder: any) => addMemberExtraReducers(builder),
});

export const { setAlert, clearAlert } = notiSlice.actions;
export default notiSlice.reducer;
