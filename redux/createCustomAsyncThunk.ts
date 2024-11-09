// customCreateAsyncThunk.ts
import { createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";

// 서버에서 보내는 에러 메시지 타입 정의
export interface ServerError {
  title: string;
  message: string;
}

// 커스텀 Thunk API 타입 정의
interface CustomThunkAPI {
  rejectValue: { message: string };
}

// 커스텀 createAsyncThunk 헬퍼 함수
const createCustomAsyncThunk = <Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: (
    arg: ThunkArg,
    thunkAPI: {
      getState: () => any;
      rejectWithValue: (value: { message: string }) => any;
    }
  ) => Promise<Returned>
): AsyncThunk<Returned, ThunkArg, CustomThunkAPI> => {
  return createAsyncThunk<Returned, ThunkArg, CustomThunkAPI>(
    typePrefix,
    async (arg, thunkAPI) => {
      try {
        return await payloadCreator(arg, thunkAPI);
      } catch (error: any) {
        let message = "알 수 없는 오류가 발생했습니다.";
        console.log(error.response.data.message);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          message = error.response.data.message;
        }
        return thunkAPI.rejectWithValue({ message });
      }
    }
  );
};

export default createCustomAsyncThunk;
