"use client";

import { Accordion, Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/domain/shared/redux";
import { AlertButton, ShareDiary } from "@/domain/diary/components";
import path from "@/domain/shared/routes";
import MyCalendar from "@/domain/diary/components/Calendar";
import { setAlert } from "@/domain/noti/slices/notiSlice";
import { AlertType } from "@/domain/noti/types";
import checkWriteRole from "@/domain/diary/function/checkRole";
import { CHARACTER_REQUIRED_ALERT } from "@/domain/shared/constants";

const Page: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isDiarySaved = useSelector(
    (state: RootState) => state.diary.isDiarySaved
  );
  const handleRedirectWritePage = () => {
    if (isDiarySaved) {
      dispatch(
        setAlert({
          title: "알림",
          message: "이미 오늘의 일기를 작성하셨습니다.",
          color: "info",
        })
      );
      return;
    }

    if (!checkWriteRole()) {
      const data: AlertType = {
        ...CHARACTER_REQUIRED_ALERT,
        callback: (
          <AlertButton
            onClick={() => router.push(path.SETTING)}
            text="캐릭터 만들러 가기"
          />
        ),
      };
      dispatch(setAlert(data));
      return;
    }
    router.push(path.WRITE);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-start">
      <div className="w-full mt-14 overflow-y-auto">
        <div className="w-full flex flex-col justify-center">
          <div className="flex justify-between m-2 ml-4 mr-4 items-center">
            <p className="text-lg">오늘의 일기를 작성해보세요~</p>
            <Button
              className="h-8 justify-center items-center"
              onClick={handleRedirectWritePage}
            >
              작성하기
            </Button>
          </div>
          <Accordion>
            <Accordion.Panel>
              <Accordion.Title>내 다이어리</Accordion.Title>
              <Accordion.Content>
                <div className="relative">
                  <p className="text-sm font-semibold flex justify-end m-2">
                    일기가 작성된 경우
                    <span className="top-0 right-0 absolute w-2 h-2 bg-cyan-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                  </p>
                </div>
                <MyCalendar />
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>공유하기</Accordion.Title>
              <Accordion.Content>
                <div className="flex-col mb-2 w-full max-w-md min-h-96 border-b border-gray-200">
                  <ShareDiary />
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Page;
