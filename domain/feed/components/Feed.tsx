import { CarouselAudioEmoji } from "@/domain/shared/components";
import { UserAvatarWithLabel } from "../../member/components";
import { FeedType } from "../types/feedResponseType";

const Feed: React.FC<FeedType> = ({
  nickname,
  characterImageUrl,
  createdDate,
  webtoonImageUrls,
  bgmUrl,
  reactionCount,
  myReaction,
  diaryId,
  publicContent,
}) => {
  return (
    <div className="flex-col w-full max-w-md border-b border-gray-200">
      <UserAvatarWithLabel
        imageUrl={characterImageUrl}
        nickname={nickname}
        description={createdDate}
      />
      <CarouselAudioEmoji
        webtoonImageUrls={webtoonImageUrls}
        bgmUrl={bgmUrl}
        reactionCount={reactionCount}
        myReaction={myReaction}
        diaryId={diaryId}
      />
      <div className="mb-10">
        <p className="w-full border-none text-sm bg-white font-mono m-3 mr-4">
          {publicContent}
        </p>
      </div>
    </div>
  );
};

export default Feed;
