import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

export const LayoutNavWrapper = styled.nav`
  width: 20%;
  height: auto;
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
  height: 100%;
  padding: 1rem;

  .mcm-p-unit {
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
    .mcm-p-unit {
      /* background-color: #20262e; */
      background-color: #473c33;
      color: white;
    }
  }

  @media ${breakPoints.mobile} {
    padding: 0rem 2vw;
    gap: 3vw 0px;
    padding-top: 4vw;

    .mcm-p-unit {
      font-size: 0.6rem;
      padding: 2vw;
    }
  }
`;
