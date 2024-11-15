"use client";

import { logoutUser } from "@/domain/auth/slices/login/loginExtraReducers";
import { PreviewUrlLabel } from "@/domain/member/components";
import UploadFileLabel from "@/domain/member/components/UploadFileLabel";
import { ChangeNicknameType } from "@/domain/member/dto/request";
import {
  changeNickname,
  fetchMemberInfo,
} from "@/domain/member/slices/memberExtraReducers";
import { setNickname } from "@/domain/member/slices/memberSlice";
import { RootState } from "@/domain/shared/redux";
import { Accordion, Button, HR, Label, Modal, TextInput } from "flowbite-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page: React.FC = () => {
  const dispatch = useDispatch();
  const { email, nickname } = useSelector(
    (state: RootState) => state.member.profile
  );
  const [openModal, setOpenModal] = React.useState(false);

  const handleChangeNickname = () => {
    dispatch<any>(
      changeNickname({
        nickname: nickname,
      })
    );
  };

  useEffect(() => {
    dispatch<any>(fetchMemberInfo());
  }, []);

  return (
    <div className="w-full h-screen justify-center">
      <div className="w-full flex justify-center items-center">
        <div className="w-full mt-10">
          <Accordion>
            <Accordion.Panel>
              <Accordion.Title>캐릭터 생성하기</Accordion.Title>
              <Accordion.Content>
                <div className="flex flex-col justify-center items-center">
                  <div className="flex flex-col justify-center items-start gap-2">
                    <Label className="text-gray-500 text-xs ml-4">
                      - 배경이 없는 이미지를 업로드해주세요. <br />
                      - 얼굴이 선명하게 나온 사진을 사용해주세요. <br />
                    </Label>
                    <div className="flex gap-2">
                      <UploadFileLabel />
                      <PreviewUrlLabel />
                    </div>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>내 정보</Accordion.Title>
              <Accordion.Content>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="modi-email" value="이메일" />
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
                    <Label htmlFor="modi-nickname" value="닉네임" />
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
                <HR />
                <div className="flex justify-between items-center gap-2">
                  <div className="mb-2 block">
                    <Label value="로그아웃" />
                  </div>
                  <Button
                    size="xs"
                    id="logout-button"
                    onClick={() => setOpenModal(true)}
                    className="bg-white text-gray-500 border border-gray-500"
                  >
                    로그아웃
                  </Button>
                </div>
                <HR />
                <div className="flex justify-between items-center gap-2">
                  <div className="mb-2 block">
                    <Label value="회원탈퇴" />
                  </div>
                  <Button
                    size="xs"
                    id="memberout"
                    onClick={() => {}}
                    className="bg-white text-gray-500 border border-gray-500"
                  >
                    회원탈퇴
                  </Button>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
          <Modal
            show={openModal}
            onClose={() => {
              setOpenModal(false);
            }}
          >
            <Modal.Header className="font-gamja">토닥토닥</Modal.Header>
            <Modal.Body>
              <div className="flex justify-between items-center">
                <p className="font-semibold text-red-600">
                  정말 로그아웃 하시겠습니까?
                </p>
                <Button onClick={() => dispatch<any>(logoutUser())}>
                  로그아웃
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Page;
