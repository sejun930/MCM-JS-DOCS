import styled from "@emotion/styled";
import { mouduleRemarksList } from "./data";
import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";

import { _PText, _Title } from "mcm-js-commons";

export default function _MainTitleTemplate() {
  const [module] = useRecoilState(moduleState);

  return (
    <Wrapper className="_main_title_wrapper_">
      <_Title className="_main_title_">📖 {module}</_Title>
      <_PText className="_main_title_remarks_">
        {mouduleRemarksList[module]}
      </_PText>
    </Wrapper>
  );
}

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px 0px;
  padding-bottom: 120px;

  ._main_title_ {
    display: flex;
    align-items: center;
  }
`;
