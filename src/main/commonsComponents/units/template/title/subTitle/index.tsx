import styled from "@emotion/styled";
import React, { CSSProperties } from "react";

import _Title from "../../../title";
import CommonsHooksComponents from "src/main/commonsComponents/hooks";
import { subTitleEmoji } from "./data";

interface IProps {
  children: React.ReactNode;
  title: string;
  titleLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  styles?: CSSProperties;
  className?: string;
}

// 소제목 템플릿
export default function _SubTitleTemplate({
  children,
  title,
  titleLevel,
  styles,
  className,
}: IProps) {
  const { getAllComponentsClassName } = CommonsHooksComponents();

  return (
    <Wrapper
      className={getAllComponentsClassName("_subTitleTemplate_", className)}
      style={styles}
    >
      <_Title
        title={`${subTitleEmoji[title]} ${title}` || ""}
        titleLevel={titleLevel || "h2"}
        className="_subTitle_"
      />
      <Line />
      {children}
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Line = styled.div`
  background-color: #666666;
  height: 3px;
  width: 100%;
  margin: 0.5rem 0px;
`;
