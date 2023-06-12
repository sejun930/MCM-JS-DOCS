import { CSSProperties } from "styled-components";
import styled from "@emotion/styled";

interface StyleTypes {
  category?: string;
  isRating?: boolean;
  show?: boolean;
  checked?: boolean;
}

export const Form = styled.form`
  margin-top: 20px;

  fieldset {
    display: none;
  }
`;

export const WriteWrapper = styled.article`
  display: flex;
  border: double 3px black;

  .mcm-input-unit-wrapper {
    width: 100%;

    .mcm-input-unit-items {
      border: unset;

      .contents-input {
        min-height: 180px;
        max-height: 300px;
        padding: 15px;
        padding-top: 20px;
        font-size: 15px;
        font-family: system-ui;
        line-height: 24px;
      }
    }
  }
`;

export const SelectCategory = styled.select`
  font-weight: 700;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border: unset;
  font-size: 16px;

  ${(props: StyleTypes) =>
    !props.category && {
      color: "#777777",
      fontWeight: "400",
    }}

  option {
    text-align-last: center;
    cursor: pointer;
    font-size: 14px;
  }
`;

export const OptionWrapper = styled.div`
  min-width: 160px;
  max-width: 160px;
  display: flex;
  flex-direction: column;
  border-right: solid 2px black;
`;

export const OptionItems = styled.div`
  display: flex;
  align-items: center;
  border-top: dotted 1px black;
  min-height: 40px;
  overflow: hidden;

  ${(props: StyleTypes) => {
    const styles: { [key: string]: string } & CSSProperties = {};

    if (props.isRating) {
      styles.transition = "all 0.3s";
      styles.minHeight = "0px";
      styles.maxHeight = "0px";
    }

    if (props.show) {
      styles.minHeight = "40px";
      styles.maxHeight = "40px";
    }

    return styles;
  }}

  .mcm-input-unit-wrapper {
    height: 100%;
    .mcm-input-unit-items {
      border: unset;

      .password-input {
        font-size: 14px;
        height: 100%;
      }
    }
  }
`;

export const Message = styled.div`
  .message {
    font-size: 24px;
    font-weight: 900;
    /* height: 50%; */
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

export const SubmitWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

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
