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
          id="agree"
          onChange={(e) => dispatch(setIsTermsAgreed(e.target.checked))}
          required
        />
        <Label htmlFor="agree" className="flex">
          I agree with the&nbsp;
          <p
            onClick={() => setOpenTermsModal(true)}
            className="text-cyan-600 hover:underline dark:text-cyan-500 underline"
          >
            terms and conditions
          </p>
          <TermsAndConditionsModal
            open={openTermsModal}
            onClose={() => setOpenTermsModal(false)}
          />
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="agree"
          onChange={(e) => dispatch(setIsPrivacyAgreed(e.target.checked))}
          required
        />
        <Label htmlFor="agree" className="flex">
          I agree with the&nbsp;
          <p
            onClick={() => setOpenPrivacyModal(true)}
            className="text-cyan-600 hover:underline dark:text-cyan-500 underline"
          >
            privacy policy
          </p>
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
