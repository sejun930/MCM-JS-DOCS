import styled from "@emotion/styled";

import { _Title, _Button } from "mcm-js-commons";
import { WriteInfoTypes } from "../comments.write.types";

import { Modal } from "mcm-js";
import PrivacyNoticePage from "./notice";
import { useEffect } from "react";

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
      modalStyles: {
        contents: {
          padding: "2rem",
        },
      },
    });
  };

  return (
    <AgreeUserPrivacyWrapper>
      <PrivacyItems checked={info.agreeProvacy}>
        <input
          id="privacy-checkbox"
          type="checkbox"
          onChange={() => changeInfo(!info.agreeProvacy)("agreeProvacy")}
        />
        <label id="privacy-checkbox-label" htmlFor="privacy-checkbox"></label>
      </PrivacyItems>

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

interface StyleTypes {
  checked?: boolean;
}

export const AgreeUserPrivacyWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0px 8px;

  #privacy-label {
    font-size: 14px;
    cursor: pointer;
    color: gray;
    width: 194px;
  }

  .checked {
    color: #30a2ff !important;
    font-weight: 700;
  }

  .privacy-notice {
    color: gray;
  }
`;

export const PrivacyItems = styled.div`
  display: flex;

  // 원본 체크박스
  #privacy-checkbox {
    display: none;
    transition: all 0.25s ease;
  }

  // 원본 체크박스를 대체할 체크박스 스타일
  #privacy-checkbox-label {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #bcbcbc;
    border-color: ${(props: StyleTypes) => props.checked && "#00c4ff"};
    border-radius: 100%;
    cursor: pointer;
    transition: all 0.25s ease;
    position: relative;

    ::after,
    ::before {
      position: absolute;
      content: "";
      width: 10px;
      height: 2px;
      background-color: #00c4ff;
      opacity: ${(props) => Number(props.checked)};
    }

    ::after {
      transform: rotate(45deg);
      width: 5px;
      top: 9px;
      left: 2.5px;
      border-radius: 50%;
    }

    ::before {
      transform: rotate(-45deg);
      left: 4.5px;
      top: 7.5px;
      border-radius: 50%;
    }
  }
`;
