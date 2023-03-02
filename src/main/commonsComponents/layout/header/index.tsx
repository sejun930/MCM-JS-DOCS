import styled from "@emotion/styled";
import { breakPoints } from "src/commons/styles/responsiveBreakPoints";

import _Link from "../../units/link/Link";
import _Title from "../../units/title";
import _Image from "../../units/image";

export default function LayoutHeadPage() {
  return (
    <HeaderWrapper>
      <_Link
        href="/"
        Component={
          <_Image
            src="/images/commons/logo/MCM_white_logo.png"
            className="_headerLogo_"
          />
        }
      />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  background-color: #aa5656;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;

  ._link_ {
    height: 220px;

    ._headerLogo_ {
      /* width: 280px; */
      height: 220px;
      object-fit: cover;
    }
  }

  /* ._title_ {
    font-size: 5rem;
    color: #e8e2e2;
    margin: 0px;
  } */

  @media ${breakPoints.mobile} {
    height: auto;
    padding: 5vw 0px;

    /* ._title_ {
      font-size: 9vw;
    } */
  }
`;
