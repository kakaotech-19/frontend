"use client";

import { Alert, Button, HR, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useSaveTextLocalStorage } from "@/domain/shared/hooks";
import { createDiaryEntry } from "@/domain/diary/slices/diaryExtraReducers";
import { checkWriteRole } from "@/domain/diary/function";
import { AlertButton, TypingText } from "@/domain/diary/components";
import { CHARACTER_REQUIRED_ALERT } from "@/domain/shared/constants";
import { setAlert } from "@/domain/noti/slices/notiSlice";
import {
  clearAiCommet,
  setCommentView,
} from "@/domain/diary/slices/diarySlice";
import { RootState } from "@/redux";
import path from "@/domain/shared/routes";
import { MoodSelector } from "@/domain/diary/components/MoodSelector";
import { DiaryTextArea } from "@/domain/diary/components/DiaryTextArea";
import { AlertType } from "@/domain/noti/types";
import { toKSTISOString } from "@/domain/shared/function";

const DiaryWritePage: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [text, handleChangeText, removeTextLocalStorage] =
    useSaveTextLocalStorage({
      key: "diaryText",
    });

  const dispatch = useDispatch();
  const router = useRouter();
  const date = new Date();

  const { aiComment, commentView, isDiarySaved } = useSelector(
    (state: RootState) => state.diary
  );

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood === selectedMood ? null : mood);
  };

  const handleSaveDiary = () => {
    if (!checkWriteRole()) {
      const data: AlertType = {
        ...CHARACTER_REQUIRED_ALERT,
        callback: (
          <AlertButton
            onClick={() => router.push(path.SETTING)}
            text="캐릭터 만들러 가기"
          />
        ),
      };
      dispatch(setAlert(data));
      return;
    }

    if (!selectedMood) {
      dispatch(
        setAlert({
          title: "알림",
          message: "기분을 선택해주세요",
          color: "warning",
        })
      );
      return;
    }

    dispatch<any>(
      createDiaryEntry({
        date: date.toISOString(),
        emotion: selectedMood,
        content: text,
      })
    );
  };

  const handleCloseModal = () => {
    dispatch(setCommentView(false));
    dispatch(clearAiCommet());
  };

  useEffect(() => {
    if (isDiarySaved) {
      removeTextLocalStorage();
      router.push(path.DIARY);
      dispatch(
        setAlert({
          title: "알림",
          message: "일기가 저장되었습니다.",
          color: "success",
          callback: (
            <AlertButton
              onClick={() =>
                router.push(`${path.READ}?date=${toKSTISOString(date)}`)
              }
              text="작성된 일기 보러가기"
            />
          ),
        })
      );
    }
  }, [isDiarySaved, removeTextLocalStorage, dispatch]);

  return (
    <div className="flex flex-col h-relative justify-between p-4">
      <div className="mt-14">
        <div className="flex justify-between items-center">
          <p className="text-xl">
            {date.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <Button
            className="h-8 justify-center items-center"
            onClick={handleSaveDiary}
          >
            저장
          </Button>
        </div>
        <HR className="mb-2 mt-2" />

        <MoodSelector
          selectedMood={selectedMood}
          onMoodSelect={handleMoodSelect}
        />
        <DiaryTextArea text={text} onChange={handleChangeText} />
      </div>

      <Modal show={commentView} onClose={handleCloseModal}>
        <Modal.Header>토닥토닥</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <TypingText text={aiComment} />
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DiaryWritePage;
