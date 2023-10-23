import { AgreeUserPrivacyWrapper } from "./privacy.styles";
import { _Button, _Checkbox } from "mcm-js-commons";
import { WriteInfoTypes } from "../comments.write.types";

import PrivacyNoticePage from "./notice";
import { useEffect } from "react";

import { getLibraries } from "src/main/commonsComponents/functional/modules";
const { Modal } = getLibraries();

// 개인정보 수집 약관 및 동의 페이지
export default function PrivacyPage({
  changeInfo,
  info,
  openPrivacy,
}: //   privacyAgreeEvent,
{
  changeInfo: (value: string | number | boolean) => (name: string) => void;
  info: WriteInfoTypes;
  openPrivacy: boolean;
  //   privacyAgreeEvent: () => void;
}) {
  useEffect(() => {
    if (openPrivacy) openPrivacyNotice();
  }, [openPrivacy]);

  // 약관보기 오픈
  const openPrivacyNotice = () => {
    const agreeProvacyEvent = () => {
      // 약관에 동의
      changeInfo(true)("agreeProvacy");

      // 모달 close
      Modal.close({
        id: "privacy-notice-modal",
      });
    };

    Modal.open({
      children: <PrivacyNoticePage privacyAgreeEvent={agreeProvacyEvent} />,
      id: "privacy-notice-modal",
      onFixWindow: true,
      closeMent: "닫기",
      mobileModalSize: {
        width: "90%",
        height: "460px",
      },
      modalStyles: {
        contents: {
          padding: "1rem 2rem",
        },
      },
      mobileModalStyles: {
        contents: {
          padding: "1rem",
        },
      },
    });
  };

  return (
    <AgreeUserPrivacyWrapper>
      <_Checkbox
        inputId="privacy-checkbox"
        onChangeEvent={() => changeInfo(!info.agreeProvacy)("agreeProvacy")}
        isChecked={info.agreeProvacy}
      />
      <label
        id="privacy-label"
        htmlFor="privacy-checkbox"
        className={(info.agreeProvacy && "checked") || undefined}
      >
        개인정보 (IP) 수집에 동의합니다.
      </label>
      <_Button
        onClickEvent={openPrivacyNotice}
        buttonType="button"
        className="privacy-notice"
      >
        [약관 보기]
      </_Button>
    </AgreeUserPrivacyWrapper>
  );
}
