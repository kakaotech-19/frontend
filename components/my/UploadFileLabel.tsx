"use client";

import { setSelectedFile } from "@/feature/redux/slices/member/memberSlice";
import { encodeFileToBase64 } from "@/utils/function";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

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
    const base64File = await encodeFileToBase64(file);
    dispatch(setSelectedFile(base64File as string));

    // 파일 미리보기
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-start justify-center w-64 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="업로드된 이미지"
            className="w-full h-full object-cover rounded-lg"
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
              SVG, PNG, JPG (최대 800x400px)
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
    </div>
  );
};

export default UploadFileLabel;
