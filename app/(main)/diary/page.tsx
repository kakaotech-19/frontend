"use client";

import MyCalendar from "@/components/diary/Calendar";
import path from "@/routes";
import { Button, Label } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCommentView } from "@/store/slices/dairy/diarySlice";

const page: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const commentView = useSelector(
    (state: RootState) => state.diary.commentView
  );

  return (
    <div className="w-full h-screen flex justify-center items-start">
      <div className="mt-14">
        <Label className="flex justify-between m-4 items-center">
          <p className="text-lg">일기를 작성해보세요~</p>
          <Button
            className="h-8 justify-center items-center"
            onClick={() => router.push(path.WRITE)}
          >
            작성하기
          </Button>
        </Label>
        {/* <Label className="flex justify-between m-4 items-center">
          <p className="text-lg">일기를 공유해보세요~</p>
          <Button
            className="h-8 justify-center items-center"
            onClick={() => router.push(path.WRITE)}
          >
            공유하기
          </Button>
        </Label> */}
        <MyCalendar />
        <Modal
          show={commentView}
          onClose={() => dispatch(setCommentView(false))}
        >
          <Modal.Header>토닥토닥</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                여기에 모달 내용을 넣으세요.
              </p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default page;
