import _SubTitleTemplate from "../../title/subTitle";
import styled from "@emotion/styled";

import _Title from "../../../title";

export default function _ExampleForm() {
  return (
    <_SubTitleTemplate title="사용 예시">
      <ExampleWrapper>
        <ExampleItems>
          <_Title title="기본값 (Default)" titleLevel="h3" />
          <ExampleResult> </ExampleResult>
        </ExampleItems>
        <ExampleItems>
          <_Title title="애니메이션 OFF" titleLevel="h3" />
        </ExampleItems>
      </ExampleWrapper>
    </_SubTitleTemplate>
  );
}

export const ExampleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  gap: 0px 50px;
`;

export const ExampleItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  h3 {
    font-size: 20px;
  }
`;

export const ExampleResult = styled.div`
  display: flex;
  width: 100%;
  border: solid 2px black;
  height: 180px;
  margin-top: 15px;
  border-radius: 10px;
`;
