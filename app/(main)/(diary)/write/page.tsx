"use client";

import { Button, Label, Textarea } from "flowbite-react";
import { useState, useLayoutEffect } from "react";

const Page: React.FC = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [text, setText] = useState("");

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
      <label className="items-center mb-5 cursor-pointer">
        <div className="flex justify-end space-x-2">
          <Button> 저장 </Button>
        </div>
      </label>
      <Label className="mb-2"> 기분을 알려주세요. </Label>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5" role="group">
        <button
          type="button"
          className="px-4 py-2 text-xs font-medium rounded-md text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:ring-2 focus:ring-cyan-700 focus:text-cyan-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-cyan-500 dark:focus:text-white"
        >
          기뻐요
        </button>
        <button
          type="button"
          className="px-4 py-2 text-xs font-medium rounded-md text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:ring-2 focus:ring-cyan-700 focus:text-cyan-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-cyan-500 dark:focus:text-white"
        >
          재밌어요
        </button>
        <button
          type="button"
          className="px-4 py-2 text-xs font-medium rounded-md text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:ring-2 focus:ring-cyan-700 focus:text-cyan-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-cyan-500 dark:focus:text-white"
        >
          행복해요
        </button>
        <button
          type="button"
          className="px-4 py-2 text-xs font-medium rounded-md text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:ring-2 focus:ring-cyan-700 focus:text-cyan-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-cyan-500 dark:focus:text-white"
        >
          슬퍼요
        </button>
        <button
          type="button"
          className="px-4 py-2 text-xs font-medium rounded-md text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:ring-2 focus:ring-cyan-700 focus:text-cyan-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-cyan-500 dark:focus:text-white"
        >
          화나요
        </button>
      </div>
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
