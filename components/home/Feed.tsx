// ... 기존 import 문 ...
import { UserAvatarWithLabel } from "../my";
import Image from "next/image";
import AudioModule from "./AudioModule";
import EmojiSelector from "./EmojiSelector";

const Feed: React.FC = () => {
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
        <AudioModule src="https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3" />
        <EmojiSelector />
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
