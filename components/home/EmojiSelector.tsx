"use client";

import { ReactionType } from "@/utils/types/dto";
import React, { useState } from "react";

interface ReactionCount {
  reactionCount: ReactionType;
}

interface MyReaction {
  myReaction: string[];
}

interface EmojiSelectorProps extends ReactionCount, MyReaction {}

const EmojiSelector: React.FC<EmojiSelectorProps> = ({
  reactionCount,
  myReaction,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Your component code here */}
      <button
        onClick={toggleMenu}
        className="absolute bottom-2 left-2 bg-gray-100 text-gray-800 text-xs font-medium px-1 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300 opacity-75"
      >
        😄
      </button>
      {isMenuOpen && (
        <div className="absolute bottom-2 left-10 bg-white rounded-full shadow-lg flex space-x-2 opacity-75">
          <button className="block w-full text-left px-1 y-2 hover:bg-gray-100">
            😀
          </button>
          <button className="block w-full text-left px-1 y-2 hover:bg-gray-100">
            😀
          </button>
          <button className="block w-full text-left px-1 y-2 hover:bg-gray-100">
            😀
          </button>
          <button className="block w-full text-left px-1 y-2 hover:bg-gray-100">
            😀
          </button>
          <button className="block w-full text-left px-1 y-2 hover:bg-gray-100 pr-4">
            😀
          </button>
        </div>
      )}
    </>
  );
};

export default EmojiSelector;
