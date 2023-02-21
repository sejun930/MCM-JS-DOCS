import styled from "@emotion/styled";
import { mouduleRemarksList } from "./data";
import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";

import _Title from "../../../title";
import _PText from "../../../text/p";

export default function _MainTitleTemplate() {
  const [module] = useRecoilState(moduleState);

  return (
    <Wrapper>
      <_Title title={`📖 ${module}`} titleLevel="h1" className="_mainTitle_" />
      <_PText text={mouduleRemarksList[module]} />
    </Wrapper>
  );
}

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px 0px;
  padding-bottom: 120px;

  ._mainTitle_ {
    display: flex;
    align-items: center;
  }
`;
