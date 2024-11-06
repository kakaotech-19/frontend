"use client";

import { Carousel, Spinner } from "flowbite-react";
import React from "react";
import AudioModule from "./AudioModule";
import Image from "next/image";
import EmojiSelector from "./EmojiSelector";
import { ReactionType } from "@/domain/feed/types/feedResponseType";

interface CarouselAudioEmojiProps {
  webtoonImageUrls: string[];
  bgmUrl: string;
  reactionCount?: ReactionType;
  myReaction?: [];
  diaryId: number;
  emojiReadonly?: boolean;
}

const CarouselAudioEmoji: React.FC<CarouselAudioEmojiProps> = ({
  webtoonImageUrls,
  bgmUrl,
  reactionCount,
  myReaction,
  diaryId,
  emojiReadonly,
}) => {
  return (
    <div className="w-full relative">
      <Carousel slide={false} draggable={true}>
        {webtoonImageUrls?.map((imageUrl, index) => (
          <div key={index} className="w-full relative">
            {imageUrl ? (
              <Image
                width={500}
                height={500}
                src={imageUrl}
                alt={`public-feed-${diaryId}-${index}`}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                className="rounded-md shadow-md object-cover"
              />
            ) : (
              <div className="w-full h-[500px] flex items-center justify-center">
                <Spinner size="xl" />
              </div>
            )}
          </div>
        ))}
      </Carousel>
      <AudioModule src={bgmUrl} />
      {reactionCount && myReaction && (
        <EmojiSelector
          reactionCount={reactionCount}
          myReaction={myReaction}
          diaryId={diaryId}
          readonly={emojiReadonly ?? false}
        />
      )}
    </div>
  );
};

export default CarouselAudioEmoji;
