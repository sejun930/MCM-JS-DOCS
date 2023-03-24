import styled from "@emotion/styled";
import { mouduleRemarksList } from "./data";
import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";

import { _PText, _Title } from "mcm-js-commons";

export default function _MainTitleTemplate() {
  const [module] = useRecoilState(moduleState);

  return (
    <Wrapper className="main-title-wrapper">
      <_Title className="main-title">📖 {module}</_Title>
      <_PText className="main-title-remarks">
        {mouduleRemarksList[module]}
      </_PText>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px 0px;
  /* padding-bottom: 120px; */

  .main-title {
    display: flex;
    align-items: center;
  }
`;
