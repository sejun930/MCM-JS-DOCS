import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

interface StyleTypes {
  render?: boolean;
}

export const LayoutNavWrapper = styled.nav`
  min-width: 15%;
  /* max-width: 20%; */
  height: auto;
  border-right: solid 3px #aa5656;
  display: flex;
  opacity: 0;
  position: relative;

  ${(props: StyleTypes) =>
    props.render && {
      opacity: 1,
    }}

  @media ${breakPoints.mobile} {
    min-width: auto;
    max-width: auto;
    display: none;
  }
`;

export const LayoutNavListWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px 0px;
  width: 100%;
  height: 100%;
  /* padding: 1rem; */

  .mcm-p-unit {
    transition: all 0.25s ease-in;
    padding: 10px;
    border-radius: 10px;
    font-size: 1rem;

    :hover {
      background-color: #f5f5f5;
    }
  }

  .search-keyword {
    color: #aa5656;
    font-weight: 800;
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

export const LayoutNavListItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-bottom: solid 2px #ababab;
  position: sticky;
  top: 0px;
  background-color: white;
`;
