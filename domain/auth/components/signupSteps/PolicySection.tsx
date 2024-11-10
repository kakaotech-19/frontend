"use client";

import { RootState } from "@/redux";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SIGNUP_STEP } from "../../constants";
import { Checkbox, Label } from "flowbite-react";
import TermsAndConditionsModal from "../TermsAndConditionsModal";
import {
  setIsPrivacyAgreed,
  setIsTermsAgreed,
} from "../../slices/signup/signupSlice";
import PrivacyPolicyModal from "../PrivacyPolicyModal";

const PolicySection: React.FC = () => {
  const dispatch = useDispatch();
  const signupStep = useSelector((state: RootState) => state.signup.step);

  const [openTermsModal, setOpenTermsModal] = useState(false);
  const [openPrivacyModal, setOpenPrivacyModal] = useState(false);

  return (
    <section
      className={`${
        signupStep == SIGNUP_STEP.POLICY ? "" : "hidden"
      } space-y-4 h-40 flex flex-col justify-center`}
    >
      <div className="flex items-center gap-2">
        <Checkbox
          id="agreeTerms"
          onChange={(e) => dispatch(setIsTermsAgreed(e.target.checked))}
          required
        />
        <Label htmlFor="agreeTerms" className="flex">
          <p
            onClick={() => setOpenTermsModal(true)}
            className="text-cyan-600 hover:underline dark:text-cyan-500 underline"
          >
            서비스 이용약관&nbsp;
          </p>
          <TermsAndConditionsModal
            open={openTermsModal}
            onClose={() => setOpenTermsModal(false)}
          />
          에 동의합니다.
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="agreePolicy"
          onChange={(e) => dispatch(setIsPrivacyAgreed(e.target.checked))}
          required
        />
        <Label htmlFor="agreePolicy" className="flex">
          <p
            onClick={() => setOpenPrivacyModal(true)}
            className="text-cyan-600 hover:underline dark:text-cyan-500 underline"
          >
            개인정보처리방침&nbsp;
          </p>
          에 동의합니다.
          <PrivacyPolicyModal
            open={openPrivacyModal}
            onClose={() => setOpenPrivacyModal(false)}
          />
        </Label>
      </div>
    </section>
  );
};

export default PolicySection;
