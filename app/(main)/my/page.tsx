"use client";

import { UserAvatarWithLabel } from "@/components/my";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import path from "@/routes";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import SettingSVG from "@/components/svg/SettingSVG";
import { HR } from "flowbite-react";

interface Post {
  id: number;
  imageUrl: string;
}

const dummyPosts: Post[] = Array(100)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    imageUrl: "/cat.png",
  }));

const Page: React.FC = () => {
  const date = useSelector((state: RootState) => state.diary.date);
  const router = useRouter();

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

  return (
    <div className="w-full h-screen justify-center">
      <div className="flex">
        <div className="flex w-full items-center justify-between mt-14">
          <UserAvatarWithLabel
            imageUrl="/cat.png"
            nickname="user"
            description="name@email.com"
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
                <div key={item.id} className="aspect-square relative">
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
    </div>
  );
};

export default Page;
