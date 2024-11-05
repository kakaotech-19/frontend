"use client";

import { Modal, Accordion, Button, Datepicker, Textarea } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux";
import { ShareDiary } from "@/domain/diary/components";
import path from "@/domain/shared/routes";
import MyCalendar from "@/domain/diary/components/Calendar";
import { setCommentView } from "@/domain/diary/slices/diarySlice";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { setAlert } from "@/domain/noti/slices/notiSlice";
import { JWT_ROLE } from "@/domain/shared/constants";
import { AlertType } from "@/domain/noti/types";

const Page: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const commentView = useSelector(
    (state: RootState) => state.diary.commentView
  );

  const token = localStorage.getItem("accessToken");
  const checkCreateRole = (): boolean => {
    if (!token) return false;
    try {
      const decodedToken = jwtDecode(token as string);
      return decodedToken.role !== JWT_ROLE.ROLE_TEMP;
    } catch (error) {
      console.error("Failed to decode token", error);
      return false;
    }
  };

  const handleRedirectWritePage = () => {
    if (!checkCreateRole()) {
      const data: AlertType = {
        title: "알림",
        message: "일기를 작성하려면 캐릭터 등록이 필요합니다.",
        color: "info",
        callback: (
          <div className="flex justify-end">
            <Button
              size="xs"
              className="mt-2"
              onClick={() => router.push(path.SETTING)}
            >
              캐릭터 만들러 가기
            </Button>
          </div>
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

export default Page;
