import { CarouselAudioEmoji } from "@/domain/shared/components";
import { UserAvatarWithLabel } from "../../member/components";
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
      <CarouselAudioEmoji
        webtoonImageUrls={webtoonImageUrls}
        bgmUrl={bgmUrl}
        reactionCount={reactionCount}
        myReaction={myReaction}
        diaryId={diaryId}
      />
      <div className="mb-10">
        <p className="w-full border-none text-sm bg-white font-mono m-2">
          안녕하세요. 고양이 사진입니다.
        </p>
      </div>
    </div>
  );
};

export default Feed;
