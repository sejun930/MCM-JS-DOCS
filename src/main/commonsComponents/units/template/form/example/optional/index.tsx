import { CodeInfoWrapper, OptionalWrapper, Wrapper } from "./optional.styles";
import React, { useEffect, useState } from "react";

import _ExampleOptionalCodeIconPage from "./code";
import _Copy from "src/main/commonsComponents/units/copy";
import getExampleCodeComponnet from "src/main/commonsComponents/hooks/getExampleCodeHooks";

// 예시용에 추가적으로 붙는 옵션 폼 페이지 (ex : 코드보기 등등)
export default function _ExampleOptionalFormPage({
  code,
  content,
  isOpen,
  changeOpenList,
  codeIdx,
}: {
  code: string;
  content: string;
  isOpen: boolean;
  changeOpenList: (idx: number, list?: Array<boolean>) => void;
  codeIdx: number;
}) {
  // 코드 보기 및 가리기
  const [showCode, setShowCode] = useState(false);
  const { getExampleCode, getReturn, getCommonsReturn } =
    getExampleCodeComponnet();

  // 코드 보기 toggle
  const toggleShowCode = () => {
    setShowCode(!showCode);

    changeOpenList(codeIdx);
  };

  useEffect(() => {
    setShowCode(isOpen);
  }, [isOpen]);

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
