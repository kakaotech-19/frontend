import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { MemberState } from "./memberSlice";
import axiosInstance from "@/domain/shared/axios";
import {
  ChangeNicknameType,
  CreateCharacterType,
} from "../types/memberRequestType";
import {
  ChangeNicknameRequestDto,
  CreateCharacterRequestDto,
} from "../dto/request";

// 회원 정보 -----------------------------------------------------
export const fetchMemberInfo = createAsyncThunk(
  "member/fetchMemberInfo",
  async () => {
    const response = await axiosInstance.get("/member/detail");
    return response.data;
  }
);

const addFetchMemberInfo = (builder: ActionReducerMapBuilder<MemberState>) => {
  builder.addCase(fetchMemberInfo.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(fetchMemberInfo.fulfilled, (state, action) => {
    state.email = action.payload.email;
    state.nickname = action.payload.nickname;
    state.characterImageUrl = action.payload.characterImageUrl;
    state.loading = false;
  });
  builder.addCase(fetchMemberInfo.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// 캐릭터 불러오기 -----------------------------------------------------
export const fetchCharacter = createAsyncThunk(
  "namespace/fetchCharacter",
  async () => {
    const response = await axiosInstance.get("/member/image");
    return response.data;
  }
);

const addFetchCharacter = (builder: ActionReducerMapBuilder<MemberState>) => {
  builder.addCase(fetchCharacter.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(fetchCharacter.fulfilled, (state, action) => {
    state.loading = false;
  });
  builder.addCase(fetchCharacter.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// 캐릭터 생성 -----------------------------------------------------
export const createCharacter = createAsyncThunk(
  "member/createCharacter",
  async (data: CreateCharacterType) => {
    const createCharacterDto = new CreateCharacterRequestDto(data);
    const response = await axiosInstance.post(
      "/member/image",
      createCharacterDto.toObject()
    );
    return response.data;
  }
);

const addCreateCharacter = (builder: ActionReducerMapBuilder<MemberState>) => {
  builder.addCase(createCharacter.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(createCharacter.fulfilled, (state, action) => {
    state.characterImageUrl = action.payload.characterImageUrl;
    state.loading = false;
  });
  builder.addCase(createCharacter.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// 캐릭터 등록 -----------------------------------------------------
export const registerCharacter = createAsyncThunk(
  "member/registerCharacter",
  async () => {
    const response = await axiosInstance.post("/member/image/register");
    return response.data;
  }
);

const addRegisterCharacter = (
  builder: ActionReducerMapBuilder<MemberState>
) => {
  builder.addCase(registerCharacter.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(registerCharacter.fulfilled, (state, action) => {
    state.loading = false;
  });
  builder.addCase(registerCharacter.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// 닉네임 변경 -----------------------------------------------------
export const changeNickname = createAsyncThunk(
  "member/changeNickname",
  async (data: ChangeNicknameType) => {
    const changeNicknameDto = new ChangeNicknameRequestDto(data);
    const response = await axiosInstance.patch(
      "/member/nickname",
      changeNicknameDto.toObject()
    );
    return response.data;
  }
);

const addChangeNickname = (builder: ActionReducerMapBuilder<MemberState>) => {
  builder.addCase(changeNickname.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(changeNickname.fulfilled, (state, action) => {
    state.loading = false;
  });
  builder.addCase(changeNickname.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message ?? null;
  });
};

// extra reducers 추가 -----------------------------------------------------
export const addMemberExtraReducers = (
  builder: ActionReducerMapBuilder<MemberState>
) => {
  addFetchMemberInfo(builder);
  addCreateCharacter(builder);
  addFetchCharacter(builder);
  addRegisterCharacter(builder);
  addChangeNickname(builder);
};
