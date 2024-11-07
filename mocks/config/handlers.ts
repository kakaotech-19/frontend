import { authMockups } from "../../domain/auth/mocks/auth";
import { feedMockups } from "../../domain/feed/mocks/feed";
import { memberMockups } from "../../domain/member/mocks/member";
import { diaryMockups } from "../../domain/diary/mocks/diary";
import { notiMockups } from "@/domain/noti/mocks/noti";

export const handlers = [
  ...authMockups,
  ...feedMockups,
  ...memberMockups,
  ...diaryMockups,
  ...notiMockups,
];
