import styled from "@emotion/styled";
import { breakPoints } from "src/commons/styles/responsiveBreakPoints";

import _Link from "../../units/link";
import _Title from "../../units/title";

export default function LayoutHeadPage() {
  return (
    <HeaderWrapper>
      {/* <HeaderItems> */}
      <_Link href="/" Component={<_Title title="My Modules" />} />
      {/* </HeaderItems> */}
    </HeaderWrapper>
  );
}

// const HeaderWrapper = styled.header``;

const HeaderWrapper = styled.header`
  background-color: #aa5656;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;

  /* position: fixed;
  width: 100%; */

  ._title_ {
    font-size: 5rem;
    color: #e8e2e2;
  }

  @media ${breakPoints.mobile} {
    height: 120px;

    ._title_ {
      font-size: 3rem;
    }
  }
`;
