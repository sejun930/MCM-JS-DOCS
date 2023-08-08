import { ModulesInfoWrapper } from "../index.styles";

import Template from "src/main/commonsComponents/units/template/main";
import _MainTitleTemplate from "src/main/commonsComponents/units/template/title/mainTitle";
import _HowUseForm from "src/main/commonsComponents/units/template/form/howUse";

import { tooltipCodeList } from "./example/tooltip.example.code.data";

export default function MyTooltip() {
  return (
    <Template>
      <ModulesInfoWrapper>
        <_MainTitleTemplate />
        <_HowUseForm
          codeInfo={tooltipCodeList}
          exmapleContents="툴팁의 기본형입니다."
        />
      </ModulesInfoWrapper>
    </Template>
  );
}
