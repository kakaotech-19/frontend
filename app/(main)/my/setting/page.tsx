"use client";

import UploadFileLabel from "@/components/my/UploadFileLabel";
import { Accordion, Button, Label } from "flowbite-react";
import { useRouter } from "next/navigation";
import React from "react";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div className="w-full h-screen justify-center">
      <div className="w-full flex justify-center items-center">
        <div className="w-full mt-10">
          <Accordion>
            <Accordion.Panel>
              <Accordion.Title>내 정보</Accordion.Title>
              <Accordion.Content></Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>캐릭터 생성하기</Accordion.Title>
              <Accordion.Content>
                <div className="flex flex-col justify-center items-center mt-10">
                  <div className="flex-col justify-center items-center gap-2">
                    <UploadFileLabel />
                    <Label className="text-gray-500 text-xs">
                      - 배경이 없는 이미지를 업로드해주세요. <br />
                      - 얼굴이 선명하게 나온 사진을 사용해주세요. <br />
                    </Label>
                  </div>
                  <Button className="mt-4"> 캐릭터 생성하기 </Button>
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
