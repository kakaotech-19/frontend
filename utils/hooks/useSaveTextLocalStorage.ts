"use client";

import { useEffect, useState } from "react";

interface UseSaveTextLocalStorageProps {
  key: string;
}

const useSaveTextLocalStorage = ({ key }: UseSaveTextLocalStorageProps) => {
  const [text, setText] = useState("");
  useEffect(() => {
    const savedText = localStorage.getItem(key);
    if (savedText) {
      setText(savedText);
    }
  }, []);

  const handleChageText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.currentTarget.value;
    setText(newText);
    // 텍스트가 변경될 때마다 로컬 스토리지에 저장합니다.
    localStorage.setItem(key, newText);
  };

  const removeText = () => {
    localStorage.removeItem(key);
    setText("");
  };

  return [text, handleChageText, removeText] as const;
};

export default useSaveTextLocalStorage;
