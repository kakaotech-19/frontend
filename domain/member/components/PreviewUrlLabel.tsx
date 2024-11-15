"use client";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "@/domain/shared/redux";
import { Button, Label, Spinner } from "flowbite-react";
import {
  fetchCharacter,
  registerCharacter,
} from "../slices/memberExtraReducers";
import { useEffect } from "react";
import { setAlert } from "@/domain/noti/slices/notiSlice";
import { clearRegister } from "../slices/memberSlice";

const PreviewUrlLabel = () => {
  const dispatch = useDispatch();
  const previewUrl = useSelector(
    (state: RootState) => state.member.characterCreate.createdCharacterUrl
  );
  const isCreateCharacter = useSelector(
    (state: RootState) => state.member.characterCreate.isCreateCharacter
  );
  const isRegisterCharacter = useSelector(
    (state: RootState) => state.member.characterCreate.isRegisterCharacter
  );

  const handleRegisterCharacter = () => {
    dispatch<any>(registerCharacter());
  };

  const handleReload = () => {
    dispatch<any>(fetchCharacter());
  };

  useEffect(() => {
    dispatch<any>(fetchCharacter());
  }, []);

  useEffect(() => {
    if (!isRegisterCharacter) return;
    dispatch(
      setAlert({
        title: "알림",
        message: "캐릭터가 등록되었습니다.",
        color: "success",
      })
    );
    dispatch(clearRegister());
  }, [isRegisterCharacter]);

  return (
    <div className="space-y-2">
      <Label value="2. 캐릭터 생성 / 등록" />
      <label
        onClick={handleReload}
        className="flex flex-col items-start justify-center w-48 h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-s0 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        {previewUrl ? (
          <Image
            width={200}
            height={200}
            src={previewUrl}
            alt={`업로드된 이미지 ${previewUrl}`}
            sizes="100vw"
            style={{ width: "100%", height: "100%" }}
            className="rounded-lg shadow-md object-cover"
          />
        ) : (
          <>
            <div className="w-full flex flex-col items-center justify-center pt-5 pb-6">
              <Spinner
                className={isCreateCharacter ? "" : "hidden"}
                size="xl"
              />
              <br></br>
              <p className="text-xs text-center">
                캐릭터 생성에 약 1 ~ 2분<br></br> 정도 걸릴 수 있습니다.
              </p>
            </div>
          </>
        )}
      </label>
      <div className="flex justify-center">
        <Button
          className={previewUrl ? "" : "hidden"}
          onClick={handleRegisterCharacter}
        >
          캐릭터 등록
        </Button>
      </div>
    </div>
  );
};

export default PreviewUrlLabel;
