"use client";

import { Feed } from "@/domain/feed/components";
import { fetchFeedEntries } from "@/domain/feed/slices/feedExtraReducers";
import { RootState } from "@/domain/shared/redux";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";

const Page: React.FC = () => {
  const feedList = useSelector((state: RootState) => state.feed.feedList);
  const feedAfter = feedList.length > 0 ? feedList[feedList.length - 1].publicDiaryId : 0;
  const feedAfterDate = feedList.length > 0 ? feedList[feedList.length - 1].createdDate : new Date(0).toISOString();
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
    dispatch<any>(fetchFeedEntries({ after: feedAfter, date: feedAfterDate }));
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md mt-14 overflow-auto">
        <InfiniteScroll
          dataLength={feedList.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<></>}
          endMessage={<></>}
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
