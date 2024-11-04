import { UserAvatarWithLabel } from "../../member/components";
import Image from "next/image";
import AudioModule from "../../shared/components/AudioModule";
import EmojiSelector from "../../shared/components/EmojiSelector";
import { Carousel } from "flowbite-react";
import { FeedType } from "../types/feedResponseType";

const Feed: React.FC<FeedType> = ({
  nickname,
  characterImageUrl,
  date,
  webtoonImageUrls,
  bgmUrl,
  reactionCount,
  myReaction,
  diaryId,
}) => {
  return (
    <div className="flex-col w-full max-w-md border-b border-gray-200">
      <UserAvatarWithLabel
        imageUrl={characterImageUrl}
        nickname={nickname}
        description={date}
      />
      <div className="w-full relative">
        <Carousel slide={false} draggable={true}>
          {webtoonImageUrls.map((imageUrl, index) => (
            <div className="w-full relative">
              <Image
                key={index}
                width={500}
                height={500}
                src={imageUrl}
                alt={`public-feed-${date}-${nickname}-${index}`}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                className="rounded-md shadow-md object-cover"
              />
            </div>
          ))}
        </Carousel>
        <AudioModule src={bgmUrl} />
        <EmojiSelector
          reactionCount={reactionCount}
          myReaction={myReaction}
          diaryId={diaryId}
        />
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
