import styled from "@emotion/styled";
import { mouduleRemarksList } from "./data";
import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";

import { _PTextWithHtml, _Title } from "mcm-js-commons";

export default function _MainTitleTemplate() {
  const [module] = useRecoilState(moduleState);

  return (
    <Wrapper className="main-title-wrapper">
      <_Title className="main-title">📖 {module}</_Title>
      <_PTextWithHtml
        className="main-title-remarks"
        dangerouslySetInnerHTML={mouduleRemarksList[module]}
      />
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px 0px;

  .main-title {
    display: flex;
    align-items: center;
  }

  .main-title-remarks {
    line-height: 28px;
    letter-spacing: -0.02rem;
  }
`;
