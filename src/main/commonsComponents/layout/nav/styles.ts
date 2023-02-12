import styled from "@emotion/styled";
import { breakPoints } from "src/commons/styles/responsiveBreakPoints";

export const LayoutNavWrapper = styled.nav`
  width: 100%;
  border-right: solid 3px #aa5656;
  /* min-width: 200px; */
  display: flex;
  position: relative;
  overflow: hidden;
`;

export const LayoutNavListWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px 0px;
  width: 100%;
  padding: 1rem;

  ._p_ {
    transition: all 0.25s ease-in;
    padding: 10px;
    border-radius: 10px;
    font-size: 1rem;

    :hover {
      background-color: #f5f5f5;
    }
  }

  ._selectTap_ {
    cursor: default !important;
    ._p_ {
      /* background-color: #20262e; */
      background-color: #473c33;
      color: white;
    }
  }

  @media ${breakPoints.mobile} {
    padding: 0rem;
  }
`;
