"use client";

import MyCalendar from "@/components/diary/Calendar";
import path from "@/routes";
import { Accordion, Button, Label, Textarea } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCommentView } from "@/store/slices/dairy/diarySlice";
import Image from "next/image";
import { MuteSVG, VolumeUpSVG } from "@/components/svg";

const page: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const commentView = useSelector(
    (state: RootState) => state.diary.commentView
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const handleClickAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-start">
      <div className="w-full mt-14 overflow-y-auto">
        <div className="w-full flex flex-col justify-center">
          <div className="flex justify-between m-4 items-center">
            <p className="text-lg">오늘의 일기를 작성해보세요~</p>
            <Button
              className="h-8 justify-center items-center"
              onClick={() => router.push(path.WRITE)}
            >
              작성하기
            </Button>
          </div>
          <Accordion>
            <Accordion.Panel>
              <Accordion.Title>내 다이어리</Accordion.Title>
              <Accordion.Content>
                <MyCalendar />
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>공유하기</Accordion.Title>
              <Accordion.Content>
                <div className="flex-col mb-2 w-full max-w-md border-b border-gray-200">
                  <div className="w-full relative">
                    <Image
                      width={500}
                      height={500}
                      src={"/cat.png"}
                      alt={"게시물 이미지"}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                      className="rounded-md shadow-md"
                    />
                    <div
                      onClick={handleClickAudio}
                      className="absolute bottom-2 right-2 text-sm font-semibold rounded-full pl-2 pr-2 bg-white opacity-75"
                    >
                      {isPlaying ? <VolumeUpSVG /> : <MuteSVG />}
                    </div>
                    <audio ref={audioRef} style={{ display: "none" }}>
                      <source
                        src="https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3"
                        type="audio/mpeg"
                      />
                      브라우저가 오디오 요소를 지원하지 않습니다.
                    </audio>
                  </div>
                  <Textarea
                    rows={2}
                    placeholder="설명을 추가하세요."
                  ></Textarea>
                  <div className="flex justify-end">
                    <Button> 업로드 </Button>
                  </div>
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

export default page;
