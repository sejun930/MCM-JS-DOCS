import styled from "@emotion/styled";
import { mouduleRemarksList } from "./data";
import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";

import _Title from "../../../title";
import _PText from "../../../text/p";

export default function _MainTitleTemplate() {
  const [module] = useRecoilState(moduleState);

  return (
    <Wrapper className="_main_title_wrapper_">
      <_Title title={`📖 ${module}`} titleLevel="h1" className="_main_title_" />
      <_PText
        text={mouduleRemarksList[module]}
        className="_main_title_remarks_"
      />
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
