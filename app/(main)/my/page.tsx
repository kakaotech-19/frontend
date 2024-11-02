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
import { Feed } from "@/components/home";
import { fetchMemberInfo } from "@/feature/redux/slices/member/memberExtraReducers";

interface Post {
  id: number;
  imageUrl: string;
}

const dummyPosts: Post[] = Array(12)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    imageUrl: "/cat.png",
  }));

const Page: React.FC = () => {
  const date = useSelector((state: RootState) => state.diary.date);
  const router = useRouter();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = () => {
    setTimeout(() => {
      const currentLength = posts.length;
      const nextPosts = dummyPosts.slice(currentLength, currentLength + 12);
      setPosts((prevPosts) => [...prevPosts, ...nextPosts]);
      if (posts.length + nextPosts.length >= dummyPosts.length) {
        setHasMore(false);
      }
    }, 100);
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
            dataLength={posts.length}
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
              {" "}
              {/* grid-cols-3에서 grid-cols-2로 변경 */}
              {posts.map((item) => (
                <div
                  key={item.id}
                  className="aspect-square relative"
                  onClick={() => setOpenModal(true)}
                >
                  <Image
                    src={item.imageUrl}
                    alt={`게시물 이미지 ${item.id}`}
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
        <Button onClick={() => router.push(path.READ)}>
          ► 2024-10-13 원본 보러가기{" "}
        </Button>
        <Modal.Body>
          <div className="space-y-6">
            <Feed />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Page;
