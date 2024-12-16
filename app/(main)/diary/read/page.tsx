"use client";

import React, { Suspense, useEffect } from "react";
import { Modal } from "flowbite-react";
import {useRouter, useSearchParams} from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/domain/shared/redux";
import {deleteDiaryEntry, fetchDiaryDetail} from "@/domain/diary/slices/diaryExtraReducers";
import { CarouselAudioEmoji } from "@/domain/shared/components";

const DiaryReadPage: React.FC = () => {
  const dispatch = useDispatch();
  const queriedDiary = useSelector(
    (state: RootState) => state.diary.queriedDiary
  );
  const [aiReviewModal, setAiReviewModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const router = useRouter();
  const handleDelete = () => {
      dispatch<any>(deleteDiaryEntry({ id: queriedDiary.diaryId, date:queriedDiary.date }));
      setDeleteModal(false);
      router.push('/diary');
  };

  useEffect(() => {
    if (date) {
      dispatch<any>(fetchDiaryDetail(date));
    }
  }, [date]);

  return (
    <div className="w-full min-h-screen flex justify-center items-start">
      <div className="w-full max-w-md flex flex-col items-center mt-14">
        <div className="flex w-full max-w-md relative" onClick={() => {
        }}>
          <CarouselAudioEmoji
              webtoonImageUrls={queriedDiary.webtoonImageUrls}
              bgmUrl={queriedDiary.bgmUrl}
              diaryId={queriedDiary.diaryId}
          />
          <div
              onClick={() => setAiReviewModal(true)}
              className="absolute bottom-2 left-2 text-sm font-semibold rounded-full pl-2 pr-2 bg-white opacity-75 border shadow-md"
          >
            AI 리뷰
          </div>
        </div>
        <div className="w-full flex justify-end px-2">
          <button
              type="button"
              className="focus:outline-none mt-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => setDeleteModal(true)}
          >
            삭제
          </button>
        </div>
        <div className="w-full max-w-md">
          <p className="text-md h-full p-2 rounded-none overflow-y-auto whitespace-pre-wrap">
            {queriedDiary.content}
          </p>
        </div>
        <Modal show={aiReviewModal} onClose={() => setAiReviewModal(false)}>
          <Modal.Header className="font-gamja">토닥토닥 AI</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {queriedDiary.aiComment}
              </p>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={deleteModal} onClose={() => setDeleteModal(false)}>
          <Modal.Header className="font-gamja">정말로 삭제하시겠습니까?</Modal.Header>
          <Modal.Body>
            <div className="space-y-6 flex justify-center px-2 py-1">
              <div className="w-full max-w-md flex flex-col justify-center items-center" >
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  공개한 일기도 함께 삭제됩니다.
                </p>
                <div className="w-full max-w-xs mx-auto flex flex-row justify-center gap-5 items-center mt-5">
                  <button
                      type="button"
                      className="flex-1 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={() => handleDelete()}
                  >
                    예
                  </button>
                  <button type="button"
                          className="flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                          onClick = {() => setDeleteModal(false)}
                  >
                    아니오
                  </button>
                </div>
              </div>
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
        <DiaryReadPage/>
      </Suspense>
  );
};

export default Page;
