"use client";

import { RootState } from "@/store";
import { Button, HR, Label, Textarea } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";

const Page: React.FC = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [text, setText] = useState("");
  const router = useRouter();
  const date = new Date();

  useLayoutEffect(() => {
    const savedText = localStorage.getItem("diaryText");
    if (savedText) {
      setText(savedText);
    }
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.currentTarget.value;
    setText(newText);
    // 텍스트가 변경될 때마다 로컬 스토리지에 저장합니다.
    localStorage.setItem("diaryText", newText);
  };

  return (
    <div className="flex flex-col h-relative justify-between p-4">
      <div className="flex justify-between items-center">
        <p className="text-xl">
          {date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="flex justify-end space-x-2">
          <Button onClick={() => router.push("/read")}> 저장 </Button>
        </div>
      </div>
      <HR className="mb-2 mt-2" />
      <Label className="mb-4">
        <p className="mb-2">기분을 알려주세요.</p>
        <div>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
            기뻐요
          </span>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-3 py-1 rounded-full dark:bg-yellow-700 dark:text-yellow-300">
            재밌어요
          </span>
          <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-3 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
            행복해요
          </span>
          <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full dark:bg-gray-900 dark:text-gray-300">
            슬퍼요
          </span>
          <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-3 py-1 rounded-full dark:bg-red-900 dark:text-red-300">
            화나요
          </span>
        </div>
      </Label>
      <div className="relative">
        <Textarea
          className="h-96 text-md"
          maxLength={3000}
          value={text}
          onChange={handleTextChange}
          placeholder="Write your thoughts here..."
        />
        <div className="absolute bottom-4 right-4 text-sm text-gray-500">
          {text.length} / 3000
        </div>
      </div>
    </div>
  );
};

export default Page;
