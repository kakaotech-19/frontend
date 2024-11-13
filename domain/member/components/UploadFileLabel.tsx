"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCharacter, setMemberImageFile } from "../slices/memberSlice";
import Image from "next/image";
import { RootState } from "@/redux";
import { Button, Label } from "flowbite-react";
import { setAlert } from "@/domain/noti/slices/notiSlice";
import { createCharacter } from "../slices/memberExtraReducers";

const UploadFileLabel: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    // 파일 객체로 저장함
    dispatch(setMemberImageFile(file));
  };

  const handlePreviewImage = (file: File) => {
    // 파일 미리보기
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 캐릭터 이미지 URL이 변경되면 미리보기 URL 변경
  const file = useSelector(
    (state: RootState) => state.member.characterCreate.memberImageFile
  );
  useEffect(() => {
    if (file) {
      handlePreviewImage(file);
    }
  }, [file]);

  const memberImageFile = useSelector(
    (state: RootState) => state.member.characterCreate.memberImageFile
  );
  const isDuplicateRequest = useSelector(
    (state: RootState) => state.member.characterCreate.isCreateCharacter
  );

  const pass5minute = () => {
    const lastCharacter = localStorage.getItem("lastCharacter");
    if (lastCharacter) {
      const lastCreateTime = new Date(lastCharacter);
      const currentTime = new Date();
      const timeDiff = currentTime.getTime() - lastCreateTime.getTime();
      const minutesDiff = Math.floor(timeDiff / (1000 * 60));

      if (minutesDiff < 5) {
        dispatch<any>(
          setAlert({
            title: "알림",
            message: `${5 - minutesDiff}분 후에 다시 시도해주세요.`,
            color: "warning",
          })
        );
        return false;
      }
    }
    localStorage.setItem("lastCharacter", new Date().toISOString());
    return true;
  };

  const handleCreateCharacter = async () => {
    if (!memberImageFile) {
      dispatch<any>(
        setAlert({
          title: "알림",
          message: "이미지를 업로드해주세요.",
          color: "info",
        })
      );
      return;
    }
    if (isDuplicateRequest) {
      dispatch<any>(
        setAlert({
          title: "알림",
          message: "캐릭터를 중복으로 생성할 수 없습니다.",
          color: "warning",
        })
      );
      return;
    }

    if (!pass5minute()) {
      return;
    }

    dispatch<any>(
      createCharacter({
        image: memberImageFile,
      })
    );
    dispatch(clearCharacter());
  };

  return (
    <div className="space-y-2">
      <Label value="1. 이미지 파일 선택" className="ml-2" />
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-start justify-center w-48 h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-s0 dark:hover:border-gray-500"
      >
        {previewUrl ? (
          <Image
            width={200}
            height={200}
            src={previewUrl}
            alt={`업로드된 이미지 ${previewUrl}`}
            sizes="100vw"
            style={{ width: "100%", height: "100%" }}
            className="rounded-lg shadow-md object-cover"
          />
        ) : (
          <div className="w-full flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p
              className="
            text-xs text-gray-500 dark:text-gray-400"
            >
              PNG, JPG, JPEG, WEBP 권장
            </p>
          </div>
        )}
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
      </label>
      <div className="flex justify-center">
        <Button
          className={memberImageFile ? "" : "hidden"}
          onClick={handleCreateCharacter}
        >
          캐릭터 생성하기
        </Button>
      </div>
    </div>
  );
};

export default UploadFileLabel;
