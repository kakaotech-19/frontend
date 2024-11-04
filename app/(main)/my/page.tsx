"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux";
import path from "@/domain/shared/constants/routes";
import Image from "next/image";
import { fetchMemberInfo } from "@/redux/slices/member/memberExtraReducers";
import {
  fetchMyFeedDetail,
  fetchMyFeedEntries,
} from "@/redux/slices/feed/feedExtraReducers";
import { MyFeedType } from "@/utils/types/dto";
import { UserAvatarWithLabel } from "@/components/my";
import SettingSVG from "@/components/svg/SettingSVG";
import EmojiSelector from "@/components/home/EmojiSelector";
import AudioModule from "@/components/home/AudioModule";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Carousel, Modal } from "flowbite-react";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const myFeedList = useSelector((state: RootState) => state.feed.myFeedList);
  const [hasMore, setHasMore] = useState(true);
  const selectedFeed = useSelector(
    (state: RootState) => state.feed.selectedFeed
  );
  const myFeedAfter = useSelector((state: RootState) => state.feed.myFeedAfter);

  const fetchMoreData = () => {
    dispatch<any>(fetchMyFeedEntries(myFeedAfter));
    if (myFeedList.length >= 50) {
      setHasMore(false);
    }
  };

  const nickname = useSelector((state: RootState) => state.member.nickname);
  const characterImageUrl = useSelector(
    (state: RootState) => state.member.characterImageUrl
  );
  const email = useSelector((state: RootState) => state.member.email);

  useEffect(() => {
    dispatch<any>(fetchMemberInfo());
    fetchMoreData();
  }, []); // useEffect가 잘 닫히는지 확인

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
            loader={<h4>로딩중 ...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>모든 게시물을 불러왔습니다.</b>
              </p>
            }
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
                    Posted on: {myFeed.createdDate}
                  </p>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>토닥토닥</Modal.Header>
        <Button
          onClick={() =>
            router.push(`${path.READ}/?date=${selectedFeed.diaryCreatedDate}`)
          }
        >
          ► 원본 일기 ({selectedFeed.diaryCreatedDate}) 보러가기{" "}
        </Button>
        <Modal.Body>
          <div className="aspect-square relative">
            <Image
              src="/minion2.png"
              alt={`게시물 이미지 test`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-md shadow-md"
            />
            <EmojiSelector
              myReaction={selectedFeed.myReaction}
              reactionCount={selectedFeed.reactionCount}
              diaryId={selectedFeed.publicDiaryId}
              readonly={true}
            />
            <AudioModule src={selectedFeed.bgmUrl} />
          </div>
          <p className="p-1">{selectedFeed.publicContent}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Page;
