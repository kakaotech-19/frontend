"use client";

import React, { Suspense, useEffect } from "react";
import { Modal } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux";
import { fetchDiaryDetail } from "@/domain/diary/slices/diaryExtraReducers";
import { CarouselAudioEmoji } from "@/domain/shared/components";

const DiaryReadPage: React.FC = () => {
  const dispatch = useDispatch();
  const queriedDiary = useSelector(
    (state: RootState) => state.diary.queriedDiary
  );
  const [showModal, setShowModal] = React.useState(false);
  const searchParams = useSearchParams();
  const date = searchParams.get("date");

  useEffect(() => {
    if (date) {
      dispatch<any>(fetchDiaryDetail(date));
    }
  }, [date]);

  return (
    <div className="w-full min-h-screen flex justify-center items-start">
      <div className="w-full max-w-md flex flex-col items-center mt-14">
        <div className="flex w-full max-w-md relative" onClick={() => {}}>
          <CarouselAudioEmoji
            webtoonImageUrls={queriedDiary.webtoonImageUrls}
            bgmUrl={queriedDiary.bgmUrl}
            diaryId={queriedDiary.diaryId}
          />
          <div
            onClick={() => setShowModal(true)}
            className="absolute bottom-2 left-2 text-sm font-semibold rounded-full pl-2 pr-2 bg-white opacity-75 border shadow-md"
          >
            AI 코멘트
          </div>
        </div>
        <div className="w-full max-w-md">
          <p className="text-md h-full p-2 rounded-none overflow-y-auto whitespace-pre-wrap">
            {queriedDiary.content}
          </p>
        </div>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <Modal.Header>AI 코멘트</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {queriedDiary.aiComment}
              </p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DiaryReadPage />
    </Suspense>
  );
};

export default Page;
