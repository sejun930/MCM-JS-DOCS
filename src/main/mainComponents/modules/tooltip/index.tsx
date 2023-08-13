import { ModulesInfoWrapper } from "../index.styles";

import Template from "src/main/commonsComponents/units/template/main";
import _MainTitleTemplate from "src/main/commonsComponents/units/template/title/mainTitle";
import _HowUseForm from "src/main/commonsComponents/units/template/form/howUse";
import _ExampleForm from "src/main/commonsComponents/units/template/form/example/template.example.container";

import { tooltipCodeList } from "./example/tooltip.example.code.data";
import {
  tooltipExampleList,
  tooltipExampleInitProps,
} from "./example/tooltip.example.render.data";
import { ReactNode, useEffect } from "react";

import { _PText } from "mcm-js-commons";
import { getCommonsHighlight } from "src/commons/highlight";
import { imagePreLoad } from "src/main/commonsComponents/functional";

export default function MyTooltip() {
  // 필요한 이미지 미리 로드하기
  useEffect(() => {
    imagePreLoad(["/images/modules/example/tooltip/dancing.gif"]);
  }, []);

  const commonsProps: { tooltipText: string | ReactNode; children: ReactNode } =
    {
      tooltipText: "World",
      children: <_PText>Hello</_PText>,
    };

  return (
    <Template>
      <ModulesInfoWrapper>
        <_MainTitleTemplate />
        <_HowUseForm
          codeInfo={tooltipCodeList}
          exmapleContents={getCommonsHighlight.tag.p("Hello")}
        />
        <_ExampleForm
          exampleList={tooltipExampleList()}
          initProps={tooltipExampleInitProps}
          commonsProps={commonsProps}
        />
      </ModulesInfoWrapper>
    </Template>
  );
}