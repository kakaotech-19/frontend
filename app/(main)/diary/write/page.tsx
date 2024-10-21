"use client";

import path from "@/router";
import { Button, HR, Label, Textarea } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState, useLayoutEffect } from "react";

const Page: React.FC = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [text, setText] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

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

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood === selectedMood ? null : mood);
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "기뻐요":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "재밌어요":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300";
      case "행복해요":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "슬퍼요":
        return "bg-gray-500 text-gray-100 dark:bg-gray-900 dark:text-gray-300";
      case "화나요":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "";
    }
  };

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
          <div className="flex justify-center items-center space-x-2">
            <Button
              className="h-8 justify-center items-center"
              onClick={() => router.push(path.READ)}
            >
              저장
            </Button>
          </div>
        </div>
        <HR className="mb-2 mt-2" />
        <Label className="mb-4">
          <p className="mb-2">기분을 알려주세요.</p>
          <div>
            {["기뻐요", "재밌어요", "행복해요", "슬퍼요", "화나요"].map(
              (mood) => (
                <span
                  key={mood}
                  className={`text-xs font-medium me-2 px-3 py-1 rounded-full cursor-pointer ${
                    selectedMood === mood
                      ? getMoodColor(mood)
                      : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => handleMoodSelect(mood)}
                >
                  {mood}
                </span>
              )
            )}
          </div>
        </Label>
        <div className="relative mt-4">
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
    </div>
  );
};

export default Page;
