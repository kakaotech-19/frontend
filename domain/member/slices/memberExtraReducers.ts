import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { MemberState } from "./memberSlice";
import axiosInstance from "@/domain/shared/axios";
import createCustomAsyncThunk from "@/domain/shared/redux/createCustomAsyncThunk";

import {
  ChangeNicknameRequestDto,
  ChangeNicknameType,
  CreateCharacterRequestDto,
  CreateCharacterType,
} from "../dto/request";

// 회원 정보 -----------------------------------------------------
export const fetchMemberInfo = createCustomAsyncThunk(
  "member/fetchMemberInfo",
  async () => {
    const response = await axiosInstance.get("/member/profile");
    return response.data;
  }
);

const addFetchMemberInfo = (builder: ActionReducerMapBuilder<MemberState>) => {
  builder.addCase(fetchMemberInfo.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(fetchMemberInfo.fulfilled, (state, action) => {
    state.profile.email = action.payload.email;
    state.profile.nickname = action.payload.nickname;
    state.profile.characterImageUrl = action.payload.characterImageUrl;
    state.loading = false;
  });
  builder.addCase(fetchMemberInfo.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload?.message ?? null;
  });
};

// 캐릭터 불러오기 -----------------------------------------------------
export const fetchCharacter = createCustomAsyncThunk(
  "namespace/fetchCharacter",
  async () => {
    const response = await axiosInstance.get("/member/character");
    return response.data;
  }
);

const addFetchCharacter = (builder: ActionReducerMapBuilder<MemberState>) => {
  builder.addCase(fetchCharacter.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(fetchCharacter.fulfilled, (state, action) => {
    state.characterCreate.createdCharacterUrl =
      action.payload.characterImageUrl;
    state.loading = false;
  });
  builder.addCase(fetchCharacter.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload?.message ?? null;
  });
};

// 캐릭터 생성 -----------------------------------------------------
export const createCharacter = createCustomAsyncThunk(
  "member/createCharacter",
  async (data: CreateCharacterType) => {
    const createCharacterDto = new CreateCharacterRequestDto(data);
    const response = await axiosInstance.post(
      "/member/character",
      createCharacterDto.toFormData(),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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
    state.characterCreate.isCreateCharacter = true; // 캐릭터 등록에 의존성 걸려있음
    state.loading = false;
  });
  builder.addCase(createCharacter.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload?.message ?? null;
  });
};

// 캐릭터 등록 -----------------------------------------------------
export const registerCharacter = createCustomAsyncThunk(
  "member/registerCharacter",
  async () => {
    const response = await axiosInstance.post("/member/character/register");
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
    localStorage.setItem("accessToken", action.payload.accessToken);
    state.characterCreate.isRegisterCharacter = true;
    state.loading = false;
  });
  builder.addCase(registerCharacter.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload?.message ?? null;
  });
};

// 닉네임 변경 -----------------------------------------------------
export const changeNickname = createCustomAsyncThunk(
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
    state.error = action.payload?.message ?? null;
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
