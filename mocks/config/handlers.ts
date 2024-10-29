import { authMockups } from "../domain/auth";
import { feedMockups } from "../domain/feed";
import { memberMockups } from "../domain/member";
import { diaryMockups } from "../domain/diary";

export const handlers = [
  ...authMockups,
  ...feedMockups,
  ...memberMockups,
  ...diaryMockups,
];
