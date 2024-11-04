"use client";

import { Button, Datepicker, Modal, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { ShareSVG } from "../../shared/components/svg";
import AudioModule from "../../shared/components/AudioModule";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useSaveTextLocalStorage } from "@/domain/shared/hooks";
import { fetchDiaryDetail } from "../slices/diaryExtraReducers";
import { uploadFeed } from "@/domain/feed/slices/feedExtraReducers";
import { DiaryResponseType } from "../dto/response";
import { UploadFeedType } from "@/domain/feed/dto/request";

const ShareDiary: React.FC = () => {
  const dispatch = useDispatch();
  const [isShare, setIsShare] = useState(false);
  const [text, handleChageText, removeText] = useSaveTextLocalStorage({
    key: "shareText",
  });

  const queriedDiary: DiaryResponseType = useSelector(
    (state: any) => state.diary.queriedDiary
  );

  const handleChage = (date: Date | null) => {
    if (!date) return;
    dispatch<any>(fetchDiaryDetail(date!.toISOString()));
  };

  const handleUpload = () => {
    const data: UploadFeedType = {
      diaryId: queriedDiary.diaryId,
      publicContent: text,
    };
    dispatch<any>(uploadFeed(data));
    setIsShare(false);
    removeText();
  };

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <Datepicker className="z-50" onChange={handleChage} autoHide={true} />
        <Button
          onClick={() => (queriedDiary.diaryId ? setIsShare(true) : null)}
          className="flex justify-end items-center h-10"
        >
          업로드
          <div className="ml-2">
            <ShareSVG />
          </div>
        </Button>
      </div>
      <div className="w-full h-auto relative">
        {queriedDiary.diaryId ? (
          <>
            <Image
              width={500}
              height={500}
              src={queriedDiary.webtoonImageUrl}
              alt={"게시물 이미지"}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              className="rounded-md shadow-md"
            />
            <AudioModule src={queriedDiary.bgmUrl} />
          </>
        ) : null}
      </div>
      <Modal show={isShare} onClose={() => setIsShare(false)}>
        <Modal.Header>토닥토닥</Modal.Header>
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
