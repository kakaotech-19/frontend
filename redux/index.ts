import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import diarySlice from "@/domain/diary/slices/diarySlice";
import feedSlice from "@/domain/feed/slices/feedSlice";
import memberSlice from "@/domain/member/slices/memberSlice";
import { loginSlice, signupSlice } from "@/domain/auth/slices";
import notiSlice from "@/domain/noti/slices/notiSlice";

const store = configureStore({
  reducer: {
    signup: signupSlice,
    login: loginSlice,
    diary: diarySlice,
    feed: feedSlice,
    member: memberSlice,
    noti: notiSlice,
  },
  middleware: (
    getDefaultMiddleware: (arg0: {
      serializableCheck: boolean; // dev: false, prod: true
      immutableCheck: boolean; // dev: false, prod: true
    }) => any
  ) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: process.env.NODE_ENV !== "development", // dev: false, prod: true
      immutableCheck: process.env.NODE_ENV !== "development", // dev: false, prod: true
    });

    // Redux Logger 미들웨어를 추가
    middlewares.push(logger);

    return middlewares;
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
