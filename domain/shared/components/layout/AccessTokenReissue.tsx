"use client";

import { reissueToken } from "@/domain/auth/slices/login/loginExtraReducers";
import { RootState } from "@/redux";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AccessTokenReissue: React.FC = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: RootState) => state.login.accessToken
  );

  useEffect(() => {
    if (!accessToken) {
      setTimeout(() => {
        dispatch<any>(reissueToken());
      }, 1000);
    }
  }, []);
  return (
    <>
      {/* Your component code here */}
      <></>
    </>
  );
};

export default AccessTokenReissue;
