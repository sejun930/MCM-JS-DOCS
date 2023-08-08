import { getCommonsHighlight } from "src/commons/highlight";
import { ExampleCodeListTypes } from "src/main/commonsComponents/units/template/form/howUse/index.types";
import { tooltipCommonsExampleCode } from "./tooltip.example.commons.code";

// Tooltip 각각의 예시 코드를 저장하는 객체
export const tooltipCodeList: ExampleCodeListTypes = {
  basic: `${tooltipCommonsExampleCode.tooltipText("aaa")}`,
};

export const tooltipReturnCommonsData = () => {
  return `${getCommonsHighlight.tag.component({
    componentName: "Tooltip",
    props: ` ${tooltipCommonsExampleCode.tooltipText("world")}`,
    children: `
      ${getCommonsHighlight.tag.span("Hello")}
    `,
  })}`;
};
