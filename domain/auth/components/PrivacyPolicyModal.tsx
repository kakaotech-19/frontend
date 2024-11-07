"use client";

import { Modal } from "flowbite-react";
import { Fragment } from "react";
import { ModalType } from "@/domain/shared/types/common";
import { PRIVACY_POLICY } from "../constants";

const PrivacyPolicyModal: React.FC<ModalType> = ({ open, onClose }) => {
  return (
    <Modal show={open} onClose={onClose}>
      <Modal.Header>{PRIVACY_POLICY.TITLE}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          {PRIVACY_POLICY.SECTIONS.map((section, index) => (
            <p
              key={index}
              className="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              <strong>{section.title}</strong>
              <br />
              {section.content.split("\n").map((line, lineIndex) => (
                <Fragment key={lineIndex}>
                  {line}
                  <br />
                </Fragment>
              ))}
            </p>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PrivacyPolicyModal;
