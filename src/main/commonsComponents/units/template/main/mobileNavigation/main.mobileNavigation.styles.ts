import styled from "@emotion/styled";
import { _Button } from "mcm-js-commons";
import { breakPoints } from "mcm-js-commons/dist/responsive";

interface StyleTypes {
  isOpen?: boolean;
  isAdmin?: boolean;
  hide?: boolean;
}

export const MobileTapWrapper = styled.nav`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #aa5656;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  z-index: 1111;

  ${(props: StyleTypes) =>
    props.isAdmin && {
      backgroundColor: "#525FE1",
    }}

  .mobile-nav-logo {
    width: 50px;
  }

  @media ${breakPoints.mobileLarge} {
    display: flex;
  }
`;

export const MobileNavigationTap = styled(_Button)`
  width: 24px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px 0px;

  ${(props: StyleTypes) =>
    props.hide && {
      display: "none",
    }};

  ::after,
  ::before {
    content: "";
    width: 100%;
    height: 3px;
    background-color: white;
    transition: all 0.25s;
  }

  ::after {
    ${(props) =>
      props.isOpen && {
        transform: "rotate(-45deg) translateY(-5px)",
        marginLeft: "8px",
      }}
  }

  ::before {
    ${(props: StyleTypes) =>
      props.isOpen && {
        transform: "rotate(45deg) translateY(5px)",
        marginLeft: "8px",
      }}
  }
`;

export const GoHome = styled(_Button)`
  font-size: 24px;
`;
