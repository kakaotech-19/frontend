"use client";

import { Modal } from "flowbite-react";
import { TERMS_AND_CONDITIONS } from "../constants";
import { Fragment } from "react";
import { ModalType } from "@/domain/shared/types/common";

const TermsAndConditionsModal: React.FC<ModalType> = ({ open, onClose }) => {
  return (
    <Modal show={open} onClose={onClose}>
      <Modal.Header>{TERMS_AND_CONDITIONS.TITLE}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          {TERMS_AND_CONDITIONS.SECTIONS.map((section, index) => (
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

export default TermsAndConditionsModal;
