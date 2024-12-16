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
  deleteMyFeed,
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
import {convertToLocalTimezone} from "@/domain/shared/function/convertToLocalTimeZone";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const[deleteModal,setDeleteModal] = useState(false);
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

  const handleDelete = (publicDiaryId: number) => {
    dispatch<any>(deleteMyFeed(publicDiaryId));
    setDeleteModal(false);
    setOpenModal(false);
    window.location.reload();
    // dispatch<any>(fetchMyFeedEntries({}));
  }

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
                    {convertToLocalTimezone(new Date(myFeed.createdDate)).slice(0,10)} 공유
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
          ► 원본 일기 ({selectedFeed.diaryCreatedDate && `${convertToLocalTimezone(new Date(selectedFeed.diaryCreatedDate)).slice(0,10)}`}) 보러가기{" "}
        </Button>
        <Modal.Body>
          <CarouselAudioEmoji
              webtoonImageUrls={selectedFeed.webtoonImageUrls}
              bgmUrl={selectedFeed.bgmUrl}
              reactionCount={selectedFeed.reactionCount}
              myReaction={selectedFeed.myReaction}
              diaryId={selectedFeed.publicDiaryId}
          />
          <div className="w-full flex justify-end px-2">
            <button
                type="button"
                className="focus:outline-none mt-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => setDeleteModal(true)}
            >
              삭제
            </button>
          </div>
          <Modal show={deleteModal} onClose={() => setDeleteModal(false)}>
            <Modal.Header className="font-gamja">정말로 삭제하시겠습니까?</Modal.Header>
            <Modal.Body>
              <div className="space-y-6 flex justify-center px-2 py-1">
                <div className="w-full max-w-md flex flex-col justify-center items-center">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    공개 일기를 삭제합니다.
                  </p>
                  <div className="w-full max-w-xs mx-auto flex flex-row justify-center gap-5 items-center mt-5">
                    <button
                        type="button"
                        className="flex-1 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={() => handleDelete(selectedFeed.publicDiaryId)}
                    >
                      예
                    </button>
                    <button type="button"
                            className="flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={() => setDeleteModal(false)}
                    >
                      아니오
                    </button>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <p className="p-1">{selectedFeed.publicContent}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Page;
