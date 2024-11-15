import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { DiaryState } from "./diarySlice";
import axiosInstance from "@/domain/shared/axios";
import createCustomAsyncThunk from "@/domain/shared/redux/createCustomAsyncThunk";
import {
  CreateDiaryEntryRequestDto,
  CreateDiaryEntryType,
  DeleteDiaryEntryRequestDto,
  DeleteDiaryEntryType,
} from "../dto/request";
import {
  DiaryResponseDto,
  DiaryResponseType,
  DiaryWriteResponseDto,
  DiaryWriteResponseType,
} from "../dto/response";
import { DEFAULT_DIARY } from "@/domain/shared/constants";

// 나의 일기 상세 조회 -----------------------------------------------------
export const fetchDiaryDetail = createCustomAsyncThunk(
  "diary/fetchDiaryDetail",
  async (params: string) => {
    const response = await axiosInstance.get(`/diary/my/detail?date=${params}`);
    const responseData = new DiaryResponseDto(response.data);
    return responseData.toObject();
  }
);

const addFetchDiaryDetail = (builder: ActionReducerMapBuilder<DiaryState>) => {
  builder.addCase(fetchDiaryDetail.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(
    fetchDiaryDetail.fulfilled,
    (state, action: PayloadAction<DiaryResponseType>) => {
      state.queriedDiary = action.payload;
      state.loading = false;
    }
  );
  builder.addCase(fetchDiaryDetail.rejected, (state, action) => {
    state.loading = false;
    state.queriedDiary = DEFAULT_DIARY;
    state.error = "해당 날짜에 일기가 존재하지 않습니다.";
  });
};

// 연월 일기 작성 현황 확인 -----------------------------------------------------
export const fetchDiaryStatus = createCustomAsyncThunk(
  "diary/fetchDiaryStatus",
  async (params: string) => {
    const response = await axiosInstance.get(`/diary/my?yearMonth=${params}`);
    return response.data;
  }
);

const addFetchDiaryStatus = (builder: ActionReducerMapBuilder<DiaryState>) => {
  builder.addCase(fetchDiaryStatus.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(fetchDiaryStatus.fulfilled, (state, action) => {
    state.diaryStatusList = [...action.payload.diaryIndexes];
    state.loading = false;
  });
  builder.addCase(fetchDiaryStatus.rejected, (state, action) => {
    state.loading = false;
    // state.error = "일기 작성 현황을 불러오는데 실패했습니다.";
  });
};

// 일기 작성 -----------------------------------------------------
export const createDiaryEntry = createCustomAsyncThunk(
  "diary/createDiaryEntry",
  async (data: CreateDiaryEntryType) => {
    const createDiaryEntryDto = new CreateDiaryEntryRequestDto(data);
    const response = await axiosInstance.post(
      "/diary/my",
      createDiaryEntryDto.toObject()
    );

    const responseData = new DiaryWriteResponseDto(response.data);
    return responseData.toObject();
  }
);

const addCreateDiaryEntry = (builder: ActionReducerMapBuilder<DiaryState>) => {
  builder.addCase(createDiaryEntry.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(
    createDiaryEntry.fulfilled,
    (state, action: PayloadAction<DiaryWriteResponseType>) => {
      state.isDiarySaved = true;
      state.aiComment = action.payload.aiComment;
      state.loading = false;
    }
  );
  builder.addCase(createDiaryEntry.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload?.message ?? null;
  });
};

// 일기 삭제 -----------------------------------------------------
export const deleteDiaryEntry = createCustomAsyncThunk(
  "diary/deleteDiaryEntry",
  async (data: DeleteDiaryEntryType) => {
    const deleteDiaryEntryDto = new DeleteDiaryEntryRequestDto(data);
    const response = await axiosInstance.delete("/diary/my/1", {
      data: deleteDiaryEntryDto.toObject(),
    });
    return response.data;
  }
);

const addDeleteDiaryEntry = (builder: ActionReducerMapBuilder<DiaryState>) => {
  builder.addCase(deleteDiaryEntry.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(deleteDiaryEntry.fulfilled, (state, action) => {
    state.loading = false;
  });
  builder.addCase(deleteDiaryEntry.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload?.message ?? null;
  });
};

// extra reducers 추가 -----------------------------------------------------
export const addDiaryExtraReducers = (
  builder: ActionReducerMapBuilder<DiaryState>
) => {
  addFetchDiaryDetail(builder);
  addFetchDiaryStatus(builder);
  addCreateDiaryEntry(builder);
  addDeleteDiaryEntry(builder);
};
