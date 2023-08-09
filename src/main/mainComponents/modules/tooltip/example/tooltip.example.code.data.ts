import { getCommonsHighlight } from "src/commons/highlight";
import { ExampleCodeListTypes } from "src/main/commonsComponents/units/template/form/howUse/index.types";
import { tooltipCommonsExampleCode } from "./tooltip.example.commons.code";

// Tooltip 각각의 예시 코드를 저장하는 객체
export const tooltipCodeList: ExampleCodeListTypes = {
  basic: ` ${tooltipCommonsExampleCode.tooltipString("World")}`,
  basicImg: ` 
      ${tooltipCommonsExampleCode.tooltipObject(
        `
        ${getCommonsHighlight.tag.img(
          getCommonsHighlight.props(
            "src",
            getCommonsHighlight.string("이미지 주소")
          )
        )}
      `
      )}
    `,
  animation: ` ${tooltipCommonsExampleCode.tooltipString("World")} ${
    tooltipCommonsExampleCode.useAnimation
  }`,
  animationImg: ` 
      ${tooltipCommonsExampleCode.useAnimation}
      ${tooltipCommonsExampleCode.tooltipObject(
        `
        ${getCommonsHighlight.tag.img(
          getCommonsHighlight.props(
            "src",
            getCommonsHighlight.string("이미지 주소")
          )
        )}
      `
      )}
    `,
};

export const tooltipReturnCommonsData = ({
  code,
  children,
}: {
  code: string;
  children?: React.ReactNode | string;
}) => {
  return `${getCommonsHighlight.tag.component({
    componentName: "Tooltip",
    props: code,
    children: `
      ${children}
    `,
  })}`;
};
