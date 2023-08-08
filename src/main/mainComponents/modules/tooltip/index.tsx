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
import { TooltipPropsType } from "mcm-js/dist/commons/types";
import { ReactNode } from "react";

export default function MyTooltip() {
  const commonsProps: { tooltipText: string | ReactNode; children: ReactNode } =
    {
      tooltipText: "World",
      children: <span>Hello</span>,
    };
  return (
    <Template>
      <ModulesInfoWrapper>
        <_MainTitleTemplate />
        <_HowUseForm
          codeInfo={tooltipCodeList}
          exmapleContents="툴팁의 기본형입니다."
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
