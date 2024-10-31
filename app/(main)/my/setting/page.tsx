"use client";

import UploadFileLabel from "@/components/my/UploadFileLabel";
import { RootState } from "@/feature/redux";
import {
  changeNickname,
  createCharacter,
  fetchMemberInfo,
} from "@/feature/redux/slices/member/memberExtraReducers";
import { setNickname } from "@/feature/redux/slices/member/memberSlice";
import { encodeFileToBase64 } from "@/utils/function";
import { ChangeNicknameType, CreateCharacterType } from "@/utils/types/dto";
import { Accordion, Button, HR, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.member.email);
  const nickname = useSelector((state: RootState) => state.member.nickname);
  const selectedFile = useSelector(
    (state: RootState) => state.member.selectedFile
  );

  const handleChangeNickname = () => {
    const data: ChangeNicknameType = {
      nickname: nickname,
    };
    dispatch<any>(changeNickname(data));
  };

  useEffect(() => {
    dispatch<any>(fetchMemberInfo());
  }, []);

  const handleCreateCharacter = async () => {
    const data: CreateCharacterType = {
      image: selectedFile,
    };
    dispatch<any>(createCharacter(data));
  };

  return (
    <div className="w-full h-screen justify-center">
      <div className="w-full flex justify-center items-center">
        <div className="w-full mt-10">
          <Accordion>
            <Accordion.Panel>
              <Accordion.Title>내 정보</Accordion.Title>
              <Accordion.Content>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="modi-email" value="Email" />
                  </div>
                  <div className="flex justify-between">
                    <TextInput
                      id="modi-email"
                      type="email"
                      value={email}
                      placeholder="name@email.com"
                      required
                      shadow
                      readOnly
                    />
                  </div>
                </div>
                <HR></HR>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="modi-nickname" value="Nickname" />
                  </div>
                  <div className="flex justify-between">
                    <TextInput
                      id="modi-nickname"
                      type="text"
                      value={nickname}
                      onInput={(e) =>
                        dispatch(setNickname(e.currentTarget.value))
                      }
                      required
                      shadow
                    />
                    <Button onClick={handleChangeNickname}>변경하기</Button>
                  </div>
                </div>
              </Accordion.Content>
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
                  <Button className="mt-4" onClick={handleCreateCharacter}>
                    {" "}
                    캐릭터 생성하기{" "}
                  </Button>
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
