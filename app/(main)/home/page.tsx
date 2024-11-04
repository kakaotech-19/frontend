"use client";

import { Feed } from "@/domain/feed/components";
import { fetchFeedEntries } from "@/domain/feed/slices/feedExtraReducers";
import { setAlert } from "@/domain/noti/slices/notiSlice";
import { RootState } from "@/redux";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";

const Page: React.FC = () => {
  const feedList = useSelector((state: RootState) => state.feed.feedList);
  const feedAfter = useSelector((state: RootState) => state.feed.feedAfter);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = () => {
    dispatch<any>(fetchFeedEntries(feedAfter));

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
