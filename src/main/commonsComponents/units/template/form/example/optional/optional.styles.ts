import styled from "@emotion/styled";
import { CSSProperties } from "react";

export const Wrapper = styled.section`
  border: solid 1px #dddddd;
  border-top: unset;
  width: 100%;

  .mcm-tooltip-wrapper {
    width: 100%;
    display: flex;

    .mcm-tooltip-items {
      width: 100%;

      .mcm-tooltip-layout {
        width: 100%;
      }
    }
  }
`;

export const OptionalWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  cursor: pointer;
  width: 100%;
`;

export const CodeInfoWrapper = styled.div`
  overflow: hidden;
  transition: all 0.65s ease-out;
  /* max-height: 0px; */

  .copy-wrapper {
    border-radius: 0px;

    .copy-text {
      padding-left: 0px;
    }
  }

  ${(props: { showCode?: boolean; allHeight?: number }) => {
    const styles: { [key: string]: string } & CSSProperties = {
      maxHeight: !props.showCode ? "0px" : `${props.allHeight}px`,
    };

    return styles;
  }}
`;
