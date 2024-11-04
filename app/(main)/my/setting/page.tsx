"use client";

import { logoutUser } from "@/domain/auth/slices/login/loginExtraReducers";
import UploadFileLabel from "@/domain/member/components/UploadFileLabel";
import {
  changeNickname,
  createCharacter,
  fetchMemberInfo,
  registerCharacter,
} from "@/domain/member/slices/memberExtraReducers";
import {
  clearCharacter,
  setNickname,
} from "@/domain/member/slices/memberSlice";
import {
  ChangeNicknameType,
  CreateCharacterType,
} from "@/domain/member/types/memberRequestType";
import { setAlert } from "@/domain/noti/slices/notiSlice";
import { AlertType } from "@/domain/noti/types";
import path from "@/domain/shared/routes";
import { RootState } from "@/redux";
import { Accordion, Button, HR, Label, Modal, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const email = useSelector((state: RootState) => state.member.email);
  const nickname = useSelector((state: RootState) => state.member.nickname);
  const selectedFile = useSelector(
    (state: RootState) => state.member.selectedFile
  );
  const [openModal, setOpenModal] = React.useState(false);

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
    if (!selectedFile) {
      const data: AlertType = {
        title: "알림",
        message: "이미지를 업로드해주세요.",
        color: "red",
      };
      dispatch;
    }
    const data: CreateCharacterType = {
      image: selectedFile,
    };
    dispatch<any>(createCharacter(data));
  };

  const isCreateCharacter = useSelector(
    (state: RootState) => state.member.isCreateCharacter
  );
  const handleSaveCharacter = () => {
    if (!isCreateCharacter) {
      const data: AlertType = {
        title: "알림",
        message: "캐릭터를 생성해주세요.",
        color: "red",
      };
      dispatch(setAlert(data));
    }
    dispatch<any>(registerCharacter());
  };

  const isRegisterCharacter = useSelector(
    (state: RootState) => state.member.isRegisterCharacter
  );
  useEffect(() => {
    if (isRegisterCharacter) {
      const data: AlertType = {
        title: "알림",
        message: "캐릭터가 등록되었습니다.",
        color: "success",
      };
      dispatch(setAlert(data));
      router.push(path.MY);
      dispatch(clearCharacter());
    }
  }, [isRegisterCharacter]);

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
                <HR />
                <div className="flex justify-end">
                  <Button id="logout-button" onClick={() => setOpenModal(true)}>
                    로그아웃
                  </Button>
                  <Modal
                    show={openModal}
                    onClose={() => {
                      setOpenModal(false);
                    }}
                  >
                    <Modal.Header>토닥토닥</Modal.Header>
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
                  <div className="flex gap-2">
                    <Button
                      size="md"
                      className="mt-4"
                      onClick={handleCreateCharacter}
                    >
                      캐릭터 생성하기{" "}
                    </Button>
                    <Button
                      size="md"
                      className="mt-4"
                      onClick={handleSaveCharacter}
                    >
                      캐릭터 등록하기{" "}
                    </Button>
                  </div>
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
