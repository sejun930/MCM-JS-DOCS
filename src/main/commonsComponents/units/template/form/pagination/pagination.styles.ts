import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

import { _Button } from "mcm-js-commons";

interface StyleTypes {
  isSelected?: boolean;
  isStartPage?: boolean;
  disable?: boolean;
}

export const PagiNationWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0px 20px;

  button {
    ${(props: StyleTypes) =>
      props.disable && {
        cursor: "not-allowed",
        opacity: 0.3,
      }}
  }

  @media ${breakPoints.mobileLarge} {
    flex-wrap: wrap;
    gap: 10px 20px;
  }
`;

export const PageJumpWrapper = styled.div`
  display: flex;
  gap: 0px 10px;
`;

export const PageListWrapper = styled.ul`
  display: flex;
  gap: 0px 16px;

  @media ${breakPoints.mobileLarge} {
    flex-wrap: wrap;
  }
`;

export const Page = styled(_Button)`
  font-size: 14px;

  -webkit-user-select: none; // 드래그 방지
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;

  ${(props: StyleTypes) =>
    props.isSelected && {
      cursor: "default",
      fontWeight: 700,
      color: "#00c4ff",
    }}

  ::before {
    position: absolute;
    content: "🔒";
    font-size: 10px;
    margin-left: -14px;

    ${(props) =>
      !props.isStartPage && {
        display: "none",
      }}
  }
`;
