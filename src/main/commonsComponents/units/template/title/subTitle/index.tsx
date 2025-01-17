import styled from "@emotion/styled";
import React, { CSSProperties } from "react";

import CommonsHooksComponents from "src/main/commonsComponents/hooks/commonsHooks";
import { subTitleEmoji } from "./data";
import { _Title, _PTextWithHtml } from "mcm-js-commons";

import { breakPoints } from "mcm-js-commons/dist/responsive";

interface IProps {
  children?: React.ReactNode;
  title: string;
  titleLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  styles?: CSSProperties;
  className?: string;
  remakrs?: string;
  sideComponent?: React.ReactNode; // 제목 옆에 함께 렌더될 컴포넌트
}

// 소제목 템플릿
export default function _SubTitleTemplate({
  children,
  title,
  titleLevel,
  styles,
  className,
  remakrs,
  sideComponent,
}: IProps) {
  const { getAllComponentsClassName, componentRender } =
    CommonsHooksComponents();

  return (
    <Wrapper
      className={getAllComponentsClassName("subTitle-Template", className)}
      style={styles}
    >
      <TitleWrapper className="subTitle-title-wrapper">
        <_Title titleLevel={titleLevel || "h2"} className="subTitle">
          {`${subTitleEmoji[title] || ""} ${title}` || ""}
        </_Title>
        {sideComponent && componentRender(sideComponent)}
      </TitleWrapper>
      <Line className="subTitle-line" />
      {remakrs && (
        <_PTextWithHtml
          className="subTitle-remarks"
          dangerouslySetInnerHTML={remakrs}
        />
      )}
      {children}
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .subTitle-remarks {
    font-size: 16px;
    margin: 6px 0px;
    margin-bottom: 20px;
    line-height: 24px;
  }

  @media ${breakPoints.mobileLarge} {
    .subTitle-remarks {
      font-size: 14px;
      line-height: 22px;
    }
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${breakPoints.mobileLarge} {
    .subTitle {
      font-size: 26px;
    }
  }
`;

export const Line = styled.div`
  background-color: #666666;
  height: 3px;
  width: 100%;
  margin: 0.5rem 0px;
`;
