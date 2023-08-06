import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";
import { _PText } from "mcm-js-commons";

interface StyleTypes {
  readOnly?: boolean;
}

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px 0px;

  .mcm-button-unit {
    ${(props: StyleTypes) =>
      props.readOnly && {
        cursor: "default",
      }}
  }

  @media ${breakPoints.mobileLarge} {
    flex-direction: row;
    gap: 0px 10px;
    align-items: center;
  }
`;

export const Label = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 10px;
  background-color: #c88ea7;
  color: #ffffff;
  margin: 0px;
  white-space: pre;

  &.bug-label-0,
  &.question-label-0 {
    background-color: #eeeeee;
    color: gray;
  }

  &.bug-label-1 {
    background-color: #e5f9db;
    color: black;
  }

  &.bug-label-2,
  &.question-label-1 {
    background-color: #19a7ce;
    color: white;
  }
`;

export const UserIP = styled(_PText)`
  font-size: 10px;
  white-space: pre;
  text-align: center;

  @media ${breakPoints.mobileSmall} {
    position: absolute;
    right: 0;
    top: 0;
  }
`;
