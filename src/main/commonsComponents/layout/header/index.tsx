import styled from "@emotion/styled";

import { _Image, _Link } from "mcm-js-commons";
import { breakPoints } from "mcm-js-commons/dist/responsive";

export default function LayoutHeadPage({ isAdmin }: { isAdmin?: boolean }) {
  return (
    <HeaderWrapper className="layout-header-wrapper" isAdmin={isAdmin}>
      <_Link href="/" className="layout-header-link">
        <_Image
          src="/images/commons/logo/MCM_white_logo.png"
          className="layout-header-logo"
        />
      </_Link>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  background-color: #aa5656;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 220px;

  ${(props: { isAdmin?: boolean }) =>
    props.isAdmin && {
      backgroundColor: "#525FE1",
    }}

  .layout-header-link {
    height: 100%;

    .layout-header-logo {
      width: 220px;
      height: 220px;
      object-fit: cover;
    }
  }

  @media ${breakPoints.mobileLarge} {
    height: auto;

    .layout-header-link {
      .layout-header-logo {
        width: 160px;
        height: 160px;
      }
    }
  }
`;
