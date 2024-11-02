"use client";

import { UserAvatarWithLabel } from "@/components/my";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { RootState } from "@/feature/redux";
import { useDispatch, useSelector } from "react-redux";
import path from "@/feature/routes";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import SettingSVG from "@/components/svg/SettingSVG";
import { Button, HR, Modal } from "flowbite-react";
import { fetchMemberInfo } from "@/feature/redux/slices/member/memberExtraReducers";
import {
  fetchMyFeedDetail,
  fetchMyFeedEntries,
} from "@/feature/redux/slices/feed/feedExtraReducers";
import { MyFeedType } from "@/utils/types/dto";
import EmojiSelector from "@/components/home/EmojiSelector";
const Page: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(true);
  const myFeedList = useSelector((state: RootState) => state.feed.myFeedList);
  const [hasMore, setHasMore] = useState(true);
  const selectedFeed = useSelector(
    (state: RootState) => state.feed.selectedFeed
  );

  useEffect(() => {
    fetchMoreData();
  }, []);

  const myFeedAfter = useSelector((state: RootState) => state.feed.myFeedAfter);
  const fetchMoreData = () => {
    dispatch<any>(fetchMyFeedEntries(myFeedAfter));

    if (myFeedList.length >= 50) {
      setHasMore(false);
    }
  };

  const handleFetchMemberInfo = () => {
    dispatch<any>(fetchMemberInfo());
  };

  const nickname = useSelector((state: RootState) => state.member.nickname);
  const characterImageUrl = useSelector(
    (state: RootState) => state.member.characterImageUrl
  );
  const email = useSelector((state: RootState) => state.member.email);
  useEffect(() => {
    handleFetchMemberInfo();
  }, []);

  return (
    <div className="w-full h-screen justify-center">
      <div className="flex">
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
      <HR className="mt-0 mb-0" />
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
            style={{ overflow: "visible" }} // 세로 스크롤을 위해 추가
          >
            <div className="w-full grid grid-cols-2 gap-4">
              {myFeedList.map((myFeed: MyFeedType) => (
                <div
                  key={myFeed.publicDiaryId}
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
          ► {selectedFeed.diaryCreatedDate} 원본 보러가기{" "}
        </Button>
        <Modal.Body>
          <div className="space-y-6">{/* <Feed /> */}</div>
          <div className="aspect-square relative">
            <Image
              src={selectedFeed.webtoonImageUrls[0]}
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
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Page;
