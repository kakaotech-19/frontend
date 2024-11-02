"use client";

import { Feed } from "@/components/home";
import { RootState } from "@/feature/redux";
import { fetchFeedEntries } from "@/feature/redux/slices/feed/feedExtraReducers";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";

const Page: React.FC = () => {
  const feedList = useSelector((state: RootState) => state.feed.feedList);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = () => {
    // feedList가 비어있으면 0을, 그렇지 않으면 마지막 요소의 publicDiaryId를 사용
    const lastId =
      feedList.length > 0 ? feedList[feedList.length - 1].publicDiaryId : 0;

    dispatch<any>(fetchFeedEntries(lastId));

    if (feedList.length >= 50) {
      setHasMore(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md mt-14 overflow-auto">
        <InfiniteScroll
          dataLength={feedList.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>로딩 중...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>모든 피드를 불러왔습니다.</b>
            </p>
          }
        >
          {feedList.map((feed) => (
            <Feed key={feed.publicDiaryId} {...feed} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Page;
