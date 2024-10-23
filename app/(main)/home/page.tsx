"use client";

import { Feed } from "@/components/home";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

// Feed 데이터를 위한 인터페이스 정의
interface FeedData {
  id: number;
  // Feed 컴포넌트에 필요한 다른 속성들을 여기에 추가하세요
}

const Page: React.FC = () => {
  const [feeds, setFeeds] = useState<FeedData[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = () => {
    // 실제 API 호출로 대체해야 합니다
    setTimeout(() => {
      const newFeeds: FeedData[] = Array(5)
        .fill(null)
        .map((_, index) => ({
          id: feeds.length + index + 1,
          // 다른 필요한 데이터를 여기에 추가하세요
        }));
      setFeeds((prevFeeds) => [...prevFeeds, ...newFeeds]);
      if (feeds.length + newFeeds.length >= 50) {
        // 예시로 50개 제한
        setHasMore(false);
      }
    }, 500);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md mt-14 overflow-auto">
        <InfiniteScroll
          dataLength={feeds.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>로딩 중...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>모든 피드를 불러왔습니다.</b>
            </p>
          }
        >
          {feeds.map((feed) => (
            <Feed key={feed.id} {...feed} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Page;
