import styled from "@emotion/styled";

import { _Image, _Link } from "mcm-js-commons";
import { breakPoints } from "mcm-js-commons/dist/responsive";

export default function LayoutHeadPage() {
  return (
    <HeaderWrapper className="_layout_header_wrapper_">
      <_Link href="/" className="_layout_header_link_">
        <_Image
          src="/images/commons/logo/MCM_white_logo.png"
          className="_layout_header_logo_"
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
  height: 200px;

  ._layout_header_link_ {
    height: 220px;

    ._layout_header_logo_ {
      /* width: 280px; */
      height: 220px;
      object-fit: cover;
    }
  }

  @media ${breakPoints.mobile} {
    height: auto;
    padding: 5vw 0px;
  }
`;
