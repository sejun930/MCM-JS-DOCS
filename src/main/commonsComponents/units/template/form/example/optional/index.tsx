import styled from "@emotion/styled";
import { useState } from "react";

import _ExampleOptionalCodeIconPage from "./code";

// 예시용에 추가적으로 붙는 옵션 폼 페이지 (ex : 코드보기 등등)
export default function _ExampleOptionalFormPage() {
  // 코드 보기 및 가리기
  const [showCode, setShowCode] = useState(false);

  // 코드 보기 toggle
  const toggleShowCode = () => {
    setShowCode(!showCode);
  };

  return (
    <Wrapper>
      <OptionalWrapper>
        <_ExampleOptionalCodeIconPage
          toggleShowCode={toggleShowCode}
          showCode={showCode}
        />
      </OptionalWrapper>
      {showCode ? "오픈" : "클로즈"}
    </Wrapper>
  );
}

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0px;
  border-bottom: solid 1px #dddddd;
`;

export const OptionalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;

  ._example_code_icon_btn_ {
    /* width: 30px; */
  }
  /* border-bottom: solid 1px #dddddd; */
  /* width: 100%; */
`;

export const Option = styled.button``;
