// 인증 도메인 -------------------------------------
import {
  VerifyEmailType,
  ConfirmEmailCodeType,
  CheckNicknameDuplicateType,
  CheckIdDuplicateType,
  RegisterUserType,
  LoginUserType,
} from "./authRequestType";

export type {
  VerifyEmailType,
  ConfirmEmailCodeType,
  CheckNicknameDuplicateType,
  CheckIdDuplicateType,
  RegisterUserType,
  LoginUserType,
};

// 피드 도메인 -------------------------------------
import { ReactionFeedType, UploadFeedType } from "./feedRequestType";
export type { ReactionFeedType, UploadFeedType };

import {
  FeedType,
  ReactionType,
  MyFeedType,
  MyFeedDetailType,
} from "./feedResponseType";
export type { FeedType, ReactionType, MyFeedType, MyFeedDetailType };

// 다이어리 도메인 -------------------------------------
import { CreateDiaryEntryType } from "./diaryRequestType";
import { DiaryResponseType } from "./diaryResponseType";
export type { CreateDiaryEntryType, DiaryResponseType };

// 회원 도메인 -------------------------------------
import { CreateCharacterType, ChangeNicknameType } from "./memberRequestType";
export type { CreateCharacterType, ChangeNicknameType };
