import styled from "@emotion/styled";
import { _Button } from "mcm-js-commons";
import { breakPoints } from "mcm-js-commons/dist/responsive";

interface StyleTypes {
  render?: boolean;
  isMobileTap?: boolean;
  isAdmin?: boolean;
}

export const LayoutNavWrapper = styled.nav`
  min-width: 15%;
  max-width: 15%;
  height: auto;
  border-right: solid 3px #aa5656;
  display: flex;
  opacity: 0;
  position: relative;
  background-color: white;
  z-index: 9;

  ${(props: StyleTypes) =>
    props.render && {
      opacity: 1,
    }}

  ${(props) =>
    props.isAdmin && {
      padding: "1rem",
      borderRightColor: "#525FE1",
      // zIndex: 1000,
    }}

  @media ${breakPoints.mobileLarge} {
    display: none;
    height: 100%;
    min-width: 100%;
    max-width: 100%;
    width: 100%;

    ${(props) =>
      props.isMobileTap && {
        display: "flex",
        border: "unset",
      }}

    ${(props) =>
      props.isAdmin && {
        padding: "0rem",
      }}
  }
`;

export const LayoutNavListWrapper = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .mcm-p-unit {
    transition: all 0.25s ease-in;
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
    justify-content: space-between;
  }
`;

export const LayoutNavListItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-bottom: solid 2px #ababab;
  background-color: white;

  ${(props: StyleTypes) =>
    props.isMobileTap && {
      padding: "0px",
      paddingBottom: "0px",
    }}

  ${(props) =>
    props.isAdmin && {
      padding: "0px",
      border: "unset",
    }}
`;

export const LayoutNav = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0px;

  ${(props: StyleTypes) =>
    props.isAdmin && {
      gap: "1rem 0px",
      top: "16px",
    }}
`;

export const Setting = styled(_Button)`
  height: 40px;
  position: fixed;
  bottom: 0px;
  padding: 0.7rem 1rem;
  font-size: 14px;
  word-spacing: 4px;
  letter-spacing: -0.02rem;

  @media ${breakPoints.mobileLarge} {
    position: relative;
    padding: 0px;
    padding-top: 1rem;
    text-align: left;
  }
`;
