"use client";

import React from "react";
import Draggable from "react-draggable";
import Image from "next/image";
import { Textarea } from "flowbite-react";

const page: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="w-full flex-col mt-14">
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
        </div>
        <div className="w-full max-w-md">
          <p className="text-md h-full p-2 rounded-none border border-red-300 overflow-y-auto">
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
        <Draggable>
          <div className="absolute bottom-20 left-10 flex">
            <Image
              width={50}
              height={50}
              src="/cat.png"
              alt={""}
              className="rounded-full"
            ></Image>
            <Textarea readOnly className="ml-2" value={"AI 위로 코멘트다냥"} />
          </div>
        </Draggable>
      </div>
    </div>
  );
};

export default page;
