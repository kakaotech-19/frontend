"use client";

import { Button, Datepicker, Modal, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { ShareSVG } from "../../shared/components/svg";
import { useDispatch, useSelector } from "react-redux";
import { useSaveTextLocalStorage } from "@/domain/shared/hooks";
import { fetchDiaryDetail } from "../slices/diaryExtraReducers";
import { uploadFeed } from "@/domain/feed/slices/feedExtraReducers";
import { DiaryResponseType } from "../dto/response";
import { UploadFeedType } from "@/domain/feed/dto/request";
import { CarouselAudioEmoji } from "@/domain/shared/components";
import KoDatepicker from "./KoDatePicker";

const ShareDiary: React.FC = () => {
  const dispatch = useDispatch();
  const [openShareModal, setOpenShareModal] = useState(false);
  const [text, handleChageText, removeText] = useSaveTextLocalStorage({
    key: "shareText",
  });

  const queriedDiary: DiaryResponseType = useSelector(
    (state: any) => state.diary.queriedDiary
  );

  const handleDateChage = (date: Date | null) => {
    if (!date) return;
    dispatch<any>(fetchDiaryDetail(date!.toISOString().slice(0, -1))); // 나중에 z를 제거하도록 포맷 통일
  };

  const handleUpload = () => {
    const data: UploadFeedType = {
      diaryId: queriedDiary.diaryId,
      publicContent: text,
    };
    dispatch<any>(uploadFeed(data));
    setOpenShareModal(false);
    removeText();
  };

  const isAiContentGenerated = () => {
    return (
      queriedDiary.bgmUrl !== "" && queriedDiary.webtoonImageUrls.length > 0
    );
  };

  const handleOpenShareModal = () => {
    // if (!isAiContentGenerated()) {
    //   dispatch(
    //     setAlert({
    //       title: "알림",
    //       message: "게시물이 아직 생성되지 않았습니다. 조금만 기다려주세요.",
    //       color: "info",
    //     })
    //   );
    //   return;
    // }
    setOpenShareModal(true);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <KoDatepicker className="z-50" onChange={handleDateChage} />
        <Button
          onClick={handleOpenShareModal}
          className="flex justify-end items-center h-10"
        >
          업로드
          <div className="ml-2">
            <ShareSVG />
          </div>
        </Button>
      </div>
      <>
        {queriedDiary.diaryId ? (
          <CarouselAudioEmoji
            webtoonImageUrls={queriedDiary.webtoonImageUrls}
            bgmUrl={queriedDiary.bgmUrl}
            diaryId={queriedDiary.diaryId}
          />
        ) : null}
      </>
      <Modal show={openShareModal} onClose={() => setOpenShareModal(false)}>
        <Modal.Header className="font-gamja">토닥토닥</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              게시물을 소개해주세요.
              <Textarea
                rows={4}
                placeholder="설명을 추가하세요."
                value={text}
                onChange={handleChageText}
              ></Textarea>
            </p>
            <div className="flex justify-end items-center">
              <Button className="flex items-center h-8" onClick={handleUpload}>
                완료
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShareDiary;
