import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

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
  cursor: pointer;
  position: relative;
  overflow: hidden;

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
    transition: all 0.3s;

    ${(props: StyleTypes) =>
      props.isCopied &&
      !props.offCopyAnimation && {
        width: "100%",
        height: "100%",
      }}

    ${(props) =>
      props.isCode && {
        display: "none",
      }}
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
  width: 70px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;

  ${(props: StyleTypes) =>
    props.textPosition && {
      alignItems: props.textPosition,
    }}

  ${(props) =>
    props.isCode && {
      padding: "1rem 0px",
    }}

  .mcm-p-unit {
    color: ${(props) => (props.isCode ? "white" : "#333333")};
  }

  @media ${breakPoints.mobile} {
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
