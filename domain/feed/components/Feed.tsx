import {
  CarouselAudioEmoji,
  UserAvatarWithLabel,
} from "@/domain/shared/components";
import { FeedType } from "../types/feedResponseType";

const Feed: React.FC<FeedType> = ({
  nickname,
  characterImageUrl,
  createdDate,
  webtoonImageUrls,
  bgmUrl,
  reactionCount,
  myReaction,
  publicDiaryId,
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
        publicDiaryId={publicDiaryId}
      />
      <div className="mb-10">
        <p className="w-full border-none text-sm bg-white font-mono p-4">
          {publicContent}
        </p>
      </div>
    </div>
  );
};

export default Feed;
