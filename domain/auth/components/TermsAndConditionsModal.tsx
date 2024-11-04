"use client";

import { RootState } from "@/redux";
import { setIsTermsModalView } from "@/domain/auth/slices/signup/signupSlice";
import { Modal } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const TermsAndConditionsModal: React.FC = () => {
  const dispatch = useDispatch();
  const IsTermsModalView = useSelector(
    (state: RootState) => state.signup.isTermsModalView
  );
  return (
    <Modal
      show={IsTermsModalView}
      onClose={() => dispatch(setIsTermsModalView(false))}
    >
      <Modal.Header>이용 약관</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>제1조 (목적)</strong>
            <br />본 약관은 “토닥토닥 애플리케이션”(이하 “앱”)의 이용과 관련하여
            “토닥토닥”과 사용자 간의 권리, 의무, 책임, 이용 조건 등 기본적인
            사항을 규정하는 것을 목적으로 합니다.
          </p>

          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>제2조 (서비스의 제공 및 변경)</strong>
            <br />
            1. “앱”은 다음과 같은 서비스를 제공합니다.
            <br />
            - 심리 치유를 위한 웹툰 및 음악 제공 서비스
            <br />
            - 일기 작성 및 개인 감정 관리 서비스
            <br />
            - 기타 “토닥토닥”이 제공하는 모든 서비스
            <br />
            2. “앱”은 필요한 경우 서비스의 내용을 추가, 변경할 수 있으며, 이러한
            경우 변경 사항을 사전에 공지합니다.
          </p>

          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>제3조 (회원 가입 및 계정 관리)</strong>
            <br />
            1. 사용자는 앱이 정한 절차에 따라 회원 가입을 통해 계정을 생성할 수
            있습니다.
            <br />
            2. 사용자는 계정 생성 시 허위의 정보를 제공해서는 안 되며, 정확한
            정보로 업데이트해야 합니다.
          </p>

          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>제4조 (개인정보의 보호 및 사용)</strong>
            <br />
            1. “앱”은 사용자의 개인정보를 적절히 보호하고, 서비스 제공을 위한
            목적에 한정하여 수집 및 이용합니다.
            <br />
            2. 사용자는 언제든지 자신의 개인정보 관리 페이지에서 정보를
            조회하거나 수정할 수 있습니다.
            <br />
            3. 개인정보와 관련된 구체적인 사항은 “토닥토닥”의 개인정보처리방침에
            따릅니다.
          </p>

          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>제5조 (사용자의 의무)</strong>
            <br />
            1. 사용자는 다음 행위를 해서는 안 됩니다.
            <br />
            - 타인의 개인정보를 도용하거나 허위 정보를 제공하는 행위
            <br />
            - 앱의 서비스를 부정한 방법으로 이용하는 행위
            <br />
            - 앱의 운영을 방해하거나 허가 없이 시스템에 접근하려는 시도
            <br />
            2. 사용자는 약관 및 앱이 제공하는 정책을 준수해야 하며, 이를 위반할
            경우 서비스 이용이 제한될 수 있습니다.
          </p>

          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>제6조 (서비스의 중단)</strong>
            <br />
            1. “토닥토닥”은 시스템 점검, 유지 보수 등 필요한 경우 서비스 제공을
            일시적으로 중단할 수 있으며, 사전 공지를 통해 사용자에게 이를
            알립니다.
            <br />
            2. “토닥토닥”은 불가피한 사유로 사전 공지가 불가능할 경우 사후에
            공지할 수 있습니다.
          </p>

          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>제7조 (면책 조항)</strong>
            <br />
            1. “앱”은 사용자 간 또는 사용자와 제3자 간에 발생한 문제에 대해
            개입하지 않으며, 책임을 지지 않습니다.
            <br />
            2. “토닥토닥”은 사용자의 귀책 사유로 인한 서비스 이용 장애에 대해
            책임을 지지 않습니다.
          </p>

          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>제8조 (약관의 개정)</strong>
            <br />
            1. “토닥토닥”은 필요 시 본 약관을 개정할 수 있으며, 개정된 약관은
            적용 일자 및 개정 사유를 명시하여 사전에 공지합니다.
            <br />
            2. 사용자는 개정된 약관에 동의하지 않을 권리가 있으며, 동의하지 않을
            경우 서비스 이용이 제한될 수 있습니다.
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TermsAndConditionsModal;
