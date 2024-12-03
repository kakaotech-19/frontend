"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/domain/shared/redux";
import Image from "next/image";
import SettingSVG from "@/domain/shared/components/svg/SettingSVG";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Modal } from "flowbite-react";
import {
  fetchMyFeedDetail,
  fetchMyFeedEntries,
} from "@/domain/feed/slices/feedExtraReducers";
import { fetchMemberInfo } from "@/domain/member/slices/memberExtraReducers";
import path from "@/domain/shared/routes";
import { MyFeedType } from "@/domain/feed/types/feedResponseType";
import {
  CarouselAudioEmoji,
  UserAvatarWithLabel,
} from "@/domain/shared/components";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { myFeedList, myFeedEnd, selectedFeed } = useSelector(
    (state: RootState) => state.feed
  );
  const myFeedAfter = myFeedList.length > 0 ? myFeedList[myFeedList.length -1 ].publicDiaryId : 0;
  const myFeedAfterDate = myFeedList.length > 0 ? myFeedList[myFeedList.length - 1].createdDate : new Date(0).toISOString();

  const fetchMoreData = () => {
    if (myFeedEnd) {
      setHasMore(false);
      return;
    }
    dispatch<any>(fetchMyFeedEntries({after: myFeedAfter, date: myFeedAfterDate}));
  };

  const { nickname, characterImageUrl, email } = useSelector(
    (state: RootState) => state.member.profile
  );
  useEffect(() => {
    dispatch<any>(fetchMemberInfo());
    fetchMoreData();
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="flex justify-center">
        <div className="flex w-full items-center justify-between mt-14">
          <UserAvatarWithLabel
            imageUrl={characterImageUrl}
            nickname={nickname}
            description={email}
          />
          <div onClick={() => router.push(path.SETTING)}>
            <SettingSVG />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-start mt-8 px-4">
        <h2 className="text-lg font-bold mb-4"> 나의 게시물 </h2>
        <div className="w-full">
          <InfiniteScroll
            dataLength={myFeedList.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<></>}
            endMessage={<></>}
            style={{ overflow: "visible" }}
          >
            <div className="w-full grid grid-cols-2 gap-4">
              {myFeedList.map((myFeed: MyFeedType) => (
                <div key={myFeed.publicDiaryId}>
                  <div
                    className="aspect-square relative"
                    onClick={() => {
                      setOpenModal(true);
                      dispatch<any>(fetchMyFeedDetail(myFeed.createdDate));
                    }}
                  >
                    <Image
                      src={myFeed.webtoonImageUrl}
                      alt={`게시물 이미지 ${myFeed.publicDiaryId}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover rounded-md shadow-md"
                    />
                  </div>
                  <p className="w-full mt-1 flex text-xs text-gray-400">
                    {myFeed.createdDate} 공유
                  </p>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="font-gamja">토닥토닥</Modal.Header>
        <Button
          onClick={() =>
            router.push(`${path.READ}/?date=${selectedFeed.diaryCreatedDate}`)
          }
        >
          ► 원본 일기 ({selectedFeed.diaryCreatedDate}) 보러가기{" "}
        </Button>
        <Modal.Body>
          <CarouselAudioEmoji
            webtoonImageUrls={selectedFeed.webtoonImageUrls}
            bgmUrl={selectedFeed.bgmUrl}
            reactionCount={selectedFeed.reactionCount}
            myReaction={selectedFeed.myReaction}
            diaryId={selectedFeed.publicDiaryId}
          />
          <p className="p-1">{selectedFeed.publicContent}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Page;
