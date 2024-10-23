"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Button, Modal } from "flowbite-react";

const page: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md flex flex-col items-center mt-14">
        <div className="flex w-full max-w-md relative" onClick={() => {}}>
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
            onClick={() => setShowModal(true)}
            className="absolute bottom-2 right-2 text-sm font-semibold rounded-full pl-2 pr-2 bg-white opacity-75"
          >
            AI 코멘트
          </div>
        </div>
        <div className="w-full max-w-md">
          <p className="text-md h-full p-2 rounded-none overflow-y-auto">
            안녕하세요. 여기는 일기 내용입니다. 일기내용 안녕하세요. 여기는 일기
            내용입니다. 일기내용 안녕하세요. 여기는 일기 내용입니다. 일기내용
            안녕하세요. 여기는 일기 내용입니다. 일기내용 안녕하세요. 여기는 일기
            내용입니다. 일기내용 안녕하세요. 여기는 일기 내용입니다. 일기내용
            안녕하세요. 여기는 일기 내용입니다. 일기내용 안녕하세요. 여기는 일기
            내용입니다. 일기내용 안녕하세요. 여기는 일기 내용입니다. 일기내용
            안녕하세요. 여기는 일기 내용입니다. 일기내용 안녕하세요. 여기는 일기
            내용입니다. 일기내용 안녕하세요. 여기는 일기 내용입니다. 일기내용
            안녕하세요. 여기는 일기 내용입니다. 일기내용 안녕하세요. 여기는 일기
            내용입니다. 일기내용 안녕하세요. 여기는 일기 내용입니다. 일기내용
            안녕하세요. 여기는 일기 내용입니다. 일기내용 안녕하세요. 여기는 일기
            내용입니다. 일기내용 안녕하세요. 여기는 일기 내용입니다. 일기내용
            안녕하세요. 여기는 일기 내용입니다. 일기내용 안녕하세요. 여기는 일기
            내용입니다. 일기내용 안녕하세요. 여기는 일기 내용입니다. 일기내용
            안녕하세요. 여기는 일기 내용입니다. 일기내용 안녕하세요. 여기는 일기
            내용입니다. 일기내용 안녕하세요. 여기는 일기 내용입니다. 일기내용
          </p>
        </div>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
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
