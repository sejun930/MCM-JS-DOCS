import { CSSProperties } from "react";
import styled from "@emotion/styled";

import { breakPoints } from "mcm-js-commons/dist/responsive";

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
      overflow: unset;
      position: unset;

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

  @media ${breakPoints.mobileLarge} {
    flex-direction: column;

    .mcm-input-unit-wrapper {
      .mcm-input-unit-items {
        .contents-input {
          padding: 10px;
          font-size: 12px;
          line-height: 18px;
        }
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

  @media ${breakPoints.mobileLarge} {
    padding: 16px 0px;
  }
`;

export const OptionWrapper = styled.div`
  min-width: 160px;
  max-width: 160px;
  display: flex;
  flex-direction: column;
  border-right: solid 2px black;

  @media ${breakPoints.mobileLarge} {
    min-width: auto;
    max-width: 100%;
    border: unset;

    .comments-password-wrapper {
      border-bottom: dotted 1px black;
      min-height: auto;

      .mcm-input-unit-wrapper {
        min-height: auto;
      }
    }
  }
`;

export const OptionItems = styled.div`
  display: flex;
  align-items: center;
  border-top: dotted 1px black;
  min-height: 40px;

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

  @media ${breakPoints.mobileLarge} {
    .mcm-input-unit-wrapper {
      .mcm-input-unit-items {
        .password-input {
          font-size: 12px;
        }
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
  margin-top: 16px;

  @media ${breakPoints.mobileLarge} {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px 0px;

    .write-comments-button {
      width: 100%;
      padding: 8px 0px;
      border: solid 1px gray;
      border-radius: 5px;
      font-size: 14px;
    }
  }
`;

export const BugStatusWrapper = styled.div`
  display: flex;
  margin: 10px 0px;
`;
