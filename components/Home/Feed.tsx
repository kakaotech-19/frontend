// ... 기존 import 문 ...
import { useState } from "react";
import { UserAvatarWithLabel } from "../Profile";
import Image from "next/image";
import { HR } from "flowbite-react";

const Feed: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex-col w-full max-w-md border-b border-gray-200">
      <UserAvatarWithLabel
        imageUrl="/cat.png"
        nickname="King cat"
        description="2024-10-10"
      />
      <div className="w-full relative">
        <Image
          width={500}
          height={500}
          src={"/cat.png"}
          alt={"게시물 이미지"}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className="rounded-md shadow-md"
        />
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
      </div>
      <div className="mb-10">
        <p className="w-full border-none text-sm bg-white font-mono m-2">
          안녕하세요. 고양이 사진입니다.
        </p>
      </div>
    </div>
  );
};

export default Feed;
