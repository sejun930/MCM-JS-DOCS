import React from "react";
import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

// DOC 페이지 메인 템플릿
export default function Template({ children }: { children: React.ReactNode }) {
  return <Wrapper className="main-template-wrapper">{children}</Wrapper>;
}

export const Wrapper = styled.main`
  padding: 1.5rem 3rem;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${breakPoints.mobile} {
    padding: 5vw;
  }
`;
