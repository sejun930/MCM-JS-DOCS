import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

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

  @media ${breakPoints.mobileLarge} {
    width: 100%;

    #privacy-label {
      font-size: 14px;
      width: 100%;
    }

    .privacy-notice {
      font-size: 12px;
      white-space: pre;
    }
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
