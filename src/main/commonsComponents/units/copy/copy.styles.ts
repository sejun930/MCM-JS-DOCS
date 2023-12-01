import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";
import { CSSProperties } from "react";

interface StyleTypes {
  isCopied?: boolean;
  offCopyAnimation?: boolean;
  isCode?: boolean;
  textPosition?: string;
}

export const CopyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f3f3f3;
  width: 100%;
  border-radius: 5px;
  min-height: 60px;
  /* cursor: pointer; */
  position: relative;
  /* overflow: hidden; */
  padding-right: 10px;

  ${(props) =>
    props.isCode && {
      backgroundColor: "#333333",
      paddingTop: "1rem",
      height: "100%",
    }}

  .hide {
    position: absolute;
    opacity: 0;
  }

  ._copyIcon_ {
    width: 20px;
    transition: all 0.3s ease-out;
  }

  ::before,
  ::after {
    content: "";
    position: absolute;
    width: 0px;
    height: 0px;
    transition: all 0.35s;
    opacity: 0;

    ${(props: StyleTypes) =>
      props.isCopied &&
      !props.offCopyAnimation && {
        opacity: 1,
        width: "99.8%",
        height: "93%",
      }}
    ${(props) =>
      props.isCode && {
        display: "none",
      }};
  }

  ::before {
    bottom: 0;
    left: 0;
    border-left: 2px solid #95bdff;
    border-bottom: 2px solid #95bdff;
    border-radius: 0 0 0 4px;
  }

  ::after {
    top: 0;
    right: 0;
    border-right: 2px solid #95bdff;
    border-top: 2px solid #95bdff;
    border-radius: 0 4px 0 0px;
  }
`;

export const CopyButton = styled.button`
  /* width: 70px; */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  right: 24px;

  ${(props: StyleTypes) => {
    const styles: CSSProperties & { [key: string]: string } = {};

    if (props.textPosition) styles.alignItems = props.textPosition;
    if (props.isCode) {
      styles.height = "auto";
      styles.top = "20px";
    }

    return styles;
  }}

  .mcm-tooltip-wrapper {
    cursor: pointer;
  }

  .mcm-p-unit {
    font-size: 12px;
    color: ${(props) => (props.isCode ? "white" : "#333333")};
  }

  @media ${breakPoints.mobileLarge} {
    display: none;
  }
`;

export const CopyText = styled.div`
  display: flex;
  padding: 0px 1rem;
  padding-bottom: 1rem;
  overflow-x: auto;
  width: 100%;
`;
