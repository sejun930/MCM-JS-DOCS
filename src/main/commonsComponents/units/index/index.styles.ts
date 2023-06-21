import styled from "@emotion/styled";
import { _Button } from "mcm-js-commons";

interface StyleTypes {
  isSelected?: boolean;
  fix?: boolean;
  isMinimum?: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 2rem;
  bottom: 3rem;
  width: 200px;
  /* height: 200px; */

  background-color: white;
  border: double 3px black;
  opacity: 0.3;
  /* background-color: rgba(255, 255, 255, 0.5); */
  border-radius: 10px;
  z-index: 900;
  padding: 1rem;
  transition: all 0.3s ease;

  ${(props: StyleTypes) =>
    props.fix && {
      opacity: 1,
    }}

  ${(props) => props.isMinimum && {}}

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

  button {
    width: 15px;
    height: 15px;
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
