"use client";

import { Button, Datepicker } from "flowbite-react";
import React from "react";
import { ShareSVG } from "../svg";
import AudioModule from "../home/AudioModule";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiaryDetail } from "@/feature/redux/slices/dairy/diaryExtraReducers";
import { DiaryResponseType } from "@/utils/types/dto";

const ShareDiary: React.FC = () => {
  const dispatch = useDispatch();
  const queriedDiary: DiaryResponseType = useSelector(
    (state: any) => state.diary.queriedDiary
  );

  const handleChage = (date: Date | null) => {
    if (!date) return;
    dispatch<any>(fetchDiaryDetail(date!.toISOString()));
  };

  const handleUpload = () => {};

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <Datepicker className="z-50" onChange={handleChage} autoHide={true} />
        <Button
          onClick={() => {}}
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
    </>
  );
};

export default ShareDiary;
