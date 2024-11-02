import { UserAvatarWithLabel } from "../my";
import Image from "next/image";
import AudioModule from "./AudioModule";
import EmojiSelector from "./EmojiSelector";
import { FeedType } from "@/utils/types/dto";

const Feed: React.FC<FeedType> = ({
  nickname,
  characterImageUrl,
  date,
  webtoonImageUrls,
  bgmUrl,
}) => {
  return (
    <div className="flex-col w-full max-w-md border-b border-gray-200">
      <UserAvatarWithLabel
        imageUrl={characterImageUrl}
        nickname={nickname}
        description={date}
      />
      <div className="w-full relative">
        <Image
          width={500}
          height={500}
          src={webtoonImageUrls[0]}
          alt={"public-feed" + date + nickname}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className="rounded-md shadow-md"
        />
        <AudioModule src={bgmUrl} />
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
