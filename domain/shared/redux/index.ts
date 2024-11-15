import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
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
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: process.env.NODE_ENV !== "development", // dev: false, prod: true
      immutableCheck: process.env.NODE_ENV !== "development", // dev: false, prod: true
    });

    // 개발 환경에서만 logger 추가
    if (process.env.NODE_ENV === "development") {
      middlewares.push(createLogger());
    }

    return middlewares;
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
