import styled from "@emotion/styled";
import { _Button } from "mcm-js-commons";

import { breakPoints } from "mcm-js-commons/dist/responsive";

interface StyleTypes {
  isSelected?: boolean;
  fix?: boolean;
  isMinimum?: boolean;
  show?: boolean;
  isLoading?: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 2rem;
  bottom: 5rem;
  width: 200px;
  background-color: white;
  border: double 3px black;
  opacity: 0.3;
  border-radius: 10px;
  z-index: 900;
  padding: 1rem;
  transition: all 0.3s ease;

  ${(props: StyleTypes) =>
    props.fix && {
      opacity: 1,
    }}

  ${(props) =>
    !props.show && {
      padding: "0px",
      width: "auto",
      borderRadius: "100%",
      border: "solid 2px gray",
    }}

  .error-message {
    line-height: 30px;

    b {
      color: #d14d72;
    }
  }

  :hover {
    opacity: 1;
    z-index: 1000;
  }

  .mcm-index-close-button {
    ::after,
    ::before {
      width: 50%;
    }
  }

  @media (min-width: 2200px) {
    right: 15%;
  }

  @media (min-width: 3000px) {
    right: 25%;
  }

  @media (min-width: 4400px) {
    right: 32%;
  }

  @media ${breakPoints.mobileLarge} {
    right: 12px;
    padding: 10px;
    display: none;
  }
`;

export const Items = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IndexListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px 0px;
`;

export const IndexList = styled.li`
  width: 100%;

  .index-button {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    transition: all 0.3s;
    font-size: 12px;
    color: gray;

    ${(props: StyleTypes) =>
      props.isSelected && {
        fontSize: "18px",
        color: "#aa5656",
        fontWeight: 700,
        cursor: "default",
      }}

    ${(props) =>
      props.isLoading && {
        cursor: "default",
      }}
  }
`;

export const OptionWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100px;
  height: 28px;
  right: -10px;
  top: -20px;
  border: dotted 1px black;
  background-color: white;

  ${(props: StyleTypes) =>
    props.isLoading && {
      filter: "blur(2px)",
    }}

  button {
    width: 15px;
    height: 15px;

    ${(props) =>
      props.isLoading && {
        cursor: "default",
      }}
  }

  .mcm-index-close-button {
    ::before,
    ::after {
      width: 80% !important;
    }
  }

  .mcm-tooltip-tail-contents {
    font-size: 12px;
    padding: 10px;
  }

  .mcm-index-fix-button {
    &.off {
      text-shadow: 0 0 0 gray;
      color: transparent;
    }
  }
`;

export const OpenIndexButton = styled(_Button)`
  padding: 10px 12px;
`;

export const Loading = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;

  .mcm-p-unit {
    font-size: 20px;
    font-weight: 700;
  }
`;
