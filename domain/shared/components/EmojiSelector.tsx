"use client";

import { ReactionFeedType } from "@/domain/feed/dto/request";
import { reactionFeed } from "@/domain/feed/slices/feedExtraReducers";
import { ReactionType } from "@/domain/feed/types/feedResponseType";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

interface ReactionCount {
  reactionCount: ReactionType;
}

interface MyReaction {
  myReaction: string[];
}

interface EmojiSelectorProps extends ReactionCount, MyReaction {
  publicDiaryId: number;
  readonly?: boolean;
}

const EmojiSelector: React.FC<EmojiSelectorProps> = ({
  publicDiaryId,
  reactionCount: initialReactionCount,
  myReaction: initialMyReaction,
  readonly = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localReactionCount, setLocalReactionCount] =
    useState(initialReactionCount);
  const [localMyReaction, setLocalMyReaction] = useState(initialMyReaction);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleReaction = (reactionType: keyof ReactionType) => {
    if (readonly) {
      return;
    }
    // 서버상태랑 별개로 UI 표시
    setLocalReactionCount((prev) => {
      const newCount = localMyReaction.includes(reactionType)
        ? Math.max(0, prev[reactionType] - 1) // 0 미만으로 안떨어지게 수정
        : prev[reactionType] + 1;
      return { ...prev, [reactionType]: newCount };
    });

    /// 서버상태랑 별개로 UI에 클릭 요소 표시
    setLocalMyReaction((prev) => {
      if (prev.includes(reactionType)) {
        return prev.filter((r) => r !== reactionType);
      }
      return [...prev, reactionType];
    });

    const data: ReactionFeedType = {
      publicDiaryId: publicDiaryId,
      reactionType: reactionType,
    };
    dispatch<any>(reactionFeed(data));
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="absolute bottom-2 left-2 bg-gray-100 text-gray-800 text-xs font-medium px-1 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300 opacity-75 border shadow-md"
      >
        😄
      </button>
      {isMenuOpen && (
        <div className="absolute bottom-2 left-10 bg-white rounded-full shadow-lg flex space-x-3 opacity-75 pr-1">
          <div className="flex justify-center items-center">
            <button
              onClick={() => handleReaction("like")}
              className={`block w-full text-left px-1 y-2 hover:bg-gray-100 ${
                localMyReaction.includes("like")
                  ? "bg-gray-300 rounded-full"
                  : "opacity-75"
              }`}
            >
              👍
            </button>
            <span className="text-sm">{localReactionCount.like}</span>
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={() => handleReaction("surprised")}
              className={`block w-full text-left px-1 y-2 hover:bg-gray-100 ${
                localMyReaction.includes("surprised")
                  ? "bg-gray-300 rounded-full"
                  : "opacity-75"
              }`}
            >
              😮
            </button>
            <span className="text-sm">{localReactionCount.surprised}</span>
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={() => handleReaction("empathize")}
              className={`block w-full text-left px-1 y-2 hover:bg-gray-100 ${
                localMyReaction.includes("empathize")
                  ? "bg-gray-300 rounded-full"
                  : "opacity-75"
              }`}
            >
              💕
            </button>
            <span className="text-sm">{localReactionCount.empathize}</span>
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={() => handleReaction("cheering")}
              className={`block w-full text-left px-1 y-2 hover:bg-gray-100 ${
                localMyReaction.includes("cheering")
                  ? "bg-gray-300 rounded-full"
                  : "opacity-75"
              }`}
            >
              🎉
            </button>
            <span className="text-sm">{localReactionCount.cheering}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EmojiSelector;
