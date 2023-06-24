import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

interface StyleTypes {
  render?: boolean;
  isMobileTap?: boolean;
}

export const LayoutNavWrapper = styled.nav`
  min-width: 15%;
  height: auto;
  border-right: solid 3px #aa5656;
  display: flex;
  opacity: 0;
  position: relative;

  ${(props: StyleTypes) =>
    props.render && {
      opacity: 1,
    }}

  @media ${breakPoints.mobileLarge} {
    max-width: auto;
    display: none;

    ${(props) =>
      props.isMobileTap && {
        display: "flex",
        border: "unset",
      }}

    .nav-list-wrapper {
      padding: 0px;
    }

    .nav-list-select-wrapper {
      padding-top: 28px;
    }
  }
`;

export const LayoutNavListWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px 0px;
  width: 100%;
  height: 100%;

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

  @media ${breakPoints.mobileLarge} {
    gap: 16px 0px;
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

  ${(props: StyleTypes) =>
    props.isMobileTap && {
      padding: "0px",
      paddingBottom: "20px",
    }}
`;
