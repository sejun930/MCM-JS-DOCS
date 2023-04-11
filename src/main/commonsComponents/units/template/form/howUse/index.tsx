import React from "react";
import getExampleCodeComponnet from "src/main/commonsComponents/hooks/getExampleCodeHooks";

import _SubTitleTemplate from "../../title/subTitle";
import _Copy from "../../../copy";

import { Wrapper } from "../form.commons.styles";

// 사용 방법에 대한 폼
export default function _HowUseForm({
  code,
  exmapleContents,
}: {
  code: string;
  exmapleContents: React.ReactNode | string;
}) {
  const { getExampleCode } = getExampleCodeComponnet();

  return (
    <Wrapper>
      <_SubTitleTemplate
        title="How To Use"
        className="howUse-subTitle"
        remakrs="기본적으로 사용할 수 있는 예시입니다."
      />
      <_Copy text={getExampleCode(code, exmapleContents)} type="Code" />
    </Wrapper>
  );
}
