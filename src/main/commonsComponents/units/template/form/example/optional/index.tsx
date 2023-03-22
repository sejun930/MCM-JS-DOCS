import styled from "@emotion/styled";
import React, { useState } from "react";

import _ExampleOptionalCodeIconPage from "./code";
import _Copy from "src/main/commonsComponents/units/copy";
import getExampleCodeComponnet from "src/main/commonsComponents/hooks/getExampleCodeHooks";

// 예시용에 추가적으로 붙는 옵션 폼 페이지 (ex : 코드보기 등등)
export default function _ExampleOptionalFormPage({
  code,
  content,
}: {
  code: string;
  content: string;
}) {
  // 코드 보기 및 가리기
  const [showCode, setShowCode] = useState(false);
  const { getExampleCode, getReturn, getCommonsReturn } =
    getExampleCodeComponnet();

  // 코드 보기 toggle
  const toggleShowCode = () => {
    setShowCode(!showCode);
  };

  return (
    <Wrapper>
      <OptionalWrapper onClick={toggleShowCode}>
        <_ExampleOptionalCodeIconPage showCode={showCode} />
      </OptionalWrapper>
      <CodeInfoWrapper showCode={showCode}>
        <_Copy
          text={getExampleCode(code, content)}
          type="Code"
          showText={getReturn(getCommonsReturn(code, content))}
          position="Top"
        />
      </CodeInfoWrapper>
    </Wrapper>
  );
}

export const Wrapper = styled.section`
  border: solid 1px #dddddd;
  border-top: unset;
  /* border-bottom: solid 1px #dddddd; */
`;

export const OptionalWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  cursor: pointer;
  width: 100%;
`;

export const CodeInfoWrapper = styled.div`
  /* max-height: 0px; */
  overflow: hidden;
  transition: all 0.65s ease-out;
  max-height: 0px;

  ._copy_ {
    border-radius: 0px;

    ._copy_text_ {
      padding-left: 0px;
    }
  }

  ${(props: { showCode?: boolean }) =>
    props.showCode && {
      maxHeight: "60vh",
    }}
`;
