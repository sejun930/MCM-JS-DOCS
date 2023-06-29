import React from "react";
import getExampleCodeComponnet from "src/main/commonsComponents/hooks/getExampleCodeHooks";
import { CopyWrapper } from "./index.styles";

import { useRecoilState } from "recoil";
import { moduleState, versState } from "src/commons/store";

import _SubTitleTemplate from "../../title/subTitle";
import _Copy from "../../../copy";
import ExampleFixedPage from "./fixed/fixed.container";

import { Wrapper } from "../form.commons.styles";
import { howUseTextList } from "./data";
import { ExampleCodeListTypes } from "src/main/mainComponents/modules/modal/example/modal.example.code.data";

// 사용 방법에 대한 폼
export default function _HowUseForm({
  codeInfo,
  exmapleContents,
  endPointRef,
}: {
  codeInfo: ExampleCodeListTypes;
  exmapleContents: React.ReactNode | string;
  endPointRef: HTMLDivElement;
}) {
  const [module] = useRecoilState(moduleState);
  const [vers] = useRecoilState(versState);

  const { getExampleCode } = getExampleCodeComponnet();

  return (
    <Wrapper id="how-use-form">
      <_SubTitleTemplate
        title="How To Use"
        className="howUse-subTitle"
        remakrs={
          howUseTextList[module]
            ? howUseTextList[module]
            : `기본적으로 사용할 수 있는 예시입니다.`
        }
      />
      <CopyWrapper>
        {codeInfo.title.length && (
          <ExampleFixedPage
            codeInfo={codeInfo}
            endPointRef={endPointRef}
            vers={vers}
          />
        )}

        {codeInfo.basic[vers] !== undefined && (
          <_Copy
            text={getExampleCode({
              code: codeInfo.basic[vers],
              children: exmapleContents,
              idx: vers,
            })}
            type="Code"
          />
        )}
      </CopyWrapper>
    </Wrapper>
  );
}
