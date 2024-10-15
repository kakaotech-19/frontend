import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./slices/signup/signupSlice";

const store = configureStore({
  reducer: {
    signup: signupSlice,
    // posts: postsReducer,
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
