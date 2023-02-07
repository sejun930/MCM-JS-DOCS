import styled from "@emotion/styled";

import _Link from "../../units/link";
import _Title from "../../units/title";

export default function LayoutHeadPage() {
  return (
    <HeaderWrapper>
      <_Link href="/" Component={<_Title title="My Modules" />} />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  background-color: #aa5656;
  display: flex;
  justify-content: center;

  ._title_ {
    font-size: 5rem;
    color: #e8e2e2;
  }
`;
