"use client";

import { Carousel } from "flowbite-react";
import React from "react";
import AudioModule from "./AudioModule";
import Image from "next/image";
import EmojiSelector from "./EmojiSelector";
import { ReactionType } from "@/domain/feed/types/feedResponseType";

interface CarouselAudioEmojiProps {
  webtoonImageUrls: string[];
  bgmUrl: string;
  reactionCount: ReactionType;
  myReaction: [];
  diaryId: number;
}

const CarouselAudioEmoji: React.FC<CarouselAudioEmojiProps> = ({
  webtoonImageUrls,
  bgmUrl,
  reactionCount,
  myReaction,
  diaryId,
}) => {
  return (
    <div className="w-full relative">
      <Carousel slide={false} draggable={true}>
        {webtoonImageUrls.map((imageUrl, index) => (
          <div className="w-full relative">
            <Image
              key={index}
              width={500}
              height={500}
              src={imageUrl}
              alt={`public-feed-${diaryId}-${index}`}
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
  );
};

export default CarouselAudioEmoji;
