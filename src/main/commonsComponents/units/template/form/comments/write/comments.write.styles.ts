import { CSSProperties } from "styled-components";
import styled from "@emotion/styled";

interface StyleTypes {
  category?: string;
  isRating?: boolean;
  show?: boolean;
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
