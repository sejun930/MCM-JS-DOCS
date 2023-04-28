import styled from "@emotion/styled";
import { Wrapper } from "../form.commons.styles";

import _SubTitleTemplate from "../../title/subTitle";

// 부가 기능에 대한 폼
export default function _FunctionalForm() {
  return (
    <Wrapper>
      <_SubTitleTemplate
        title="Functional"
        className="functional-form"
        remakrs="제공되는 기능을 이용하면 다양한 상황들에 적용할 수 있어요."
      />
      <FunctionalWrapper>123</FunctionalWrapper>
    </Wrapper>
  );
}

export const FunctionalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #333333;
`;
