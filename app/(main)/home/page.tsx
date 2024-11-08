"use client";

import { Feed } from "@/domain/feed/components";
import { fetchFeedEntries } from "@/domain/feed/slices/feedExtraReducers";
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

  const feedEnd = useSelector((state: RootState) => state.feed.feedEnd);
  const fetchMoreData = () => {
    if (feedEnd) {
      setHasMore(false);
      return;
    }
    dispatch<any>(fetchFeedEntries(feedAfter));
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md mt-14 overflow-auto">
        <InfiniteScroll
          dataLength={feedList.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<></>}
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
