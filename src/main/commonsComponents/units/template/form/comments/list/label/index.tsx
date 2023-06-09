import styled from "@emotion/styled";

import { _SpanText } from "mcm-js-commons";
import { CSSProperties } from "react";

import CommonsHooksComponents from "src/main/commonsComponents/hooks/commonsHooks";

// label 렌더용 컴포넌트
export default function CommentsLabel({
  children,
  styles,
  className,
}: {
  children: JSX.Element;
  styles?: CSSProperties;
  className?: string;
}) {
  const { getAllComponentsClassName } = CommonsHooksComponents();
  return (
    <Label
      style={styles}
      className={getAllComponentsClassName("category-label-button", className)}
    >
      {children}
    </Label>
  );
}

export const Label = styled.label`
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 10px;
  min-width: 82px;
  background-color: #c88ea7;
  color: #ffffff;

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
