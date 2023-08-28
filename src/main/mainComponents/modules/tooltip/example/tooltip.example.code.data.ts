import React from "react";

import { getCommonsHighlight } from "src/commons/highlight";
import { ExampleCodeListTypes } from "src/main/commonsComponents/units/template/form/howUse/index.types";
import { tooltipCommonsExampleCode } from "./tooltip.example.commons.code";

// Tooltip 각각의 예시 코드를 저장하는 객체
export const tooltipCodeList: ExampleCodeListTypes = {
  basic: (text?: string) =>
    ` ${tooltipCommonsExampleCode.tooltipString(text || "World")}`,
  basicImg: () => ` 
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
  animation: () =>
    ` ${tooltipCommonsExampleCode.tooltipString("World")} ${
      tooltipCommonsExampleCode.useAnimation
    }`,
  animationImg: () => ` 
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
      ${tooltipCommonsExampleCode.useAnimation}
    `,
  position: (
    tooltipText: string,
    position: "top" | "bottom" | "left" | "right"
  ) =>
    `
     ${tooltipCodeList.basic(tooltipText)}
      ${tooltipCommonsExampleCode.useAnimation}
     ${tooltipCommonsExampleCode.position(position || "top")} ${
      (position === "top" && getCommonsHighlight.colors("생략 가능").comment) ||
      ""
    }
    `,
  styles: () => `
     ${tooltipCodeList.basic("New Style Tooltip")}
     ${tooltipCommonsExampleCode.styles()}
    `,
  mobileStyles: () => `
     ${tooltipCodeList.basic("New Mobile Style Tooltip")}
     ${tooltipCommonsExampleCode.styles(true)}
   `,
  disable: () =>
    `${tooltipCodeList.basic(
      "New Style Tooltip"
    )} ${tooltipCommonsExampleCode.disable()}`,
  onoff: () =>
    `${tooltipCodeList.basic(
      "New Style Tooltip"
    )} ${tooltipCommonsExampleCode.onoff()}`,
  offHover: () =>
    `
     ${tooltipCodeList.basic("Already fixed")} 
      ${tooltipCommonsExampleCode.offHover()}
      ${tooltipCommonsExampleCode.onoff()}
    `,
  hideMobile: () =>
    `
     ${tooltipCodeList.basic("모바일에서는 보이지 않습니다.")} 
      ${tooltipCommonsExampleCode.offHover()}
      ${tooltipCommonsExampleCode.onoff()}
      ${tooltipCommonsExampleCode.hideMobile()}
    `,
  fix: () =>
    `
     ${tooltipCodeList.basic("고정된 툴팁입니다.")} 
      ${tooltipCommonsExampleCode.onoff()}
      ${tooltipCommonsExampleCode.isFix()}
    `,
};

export const tooltipReturnCommonsData = ({
  code,
  children,
  changeContent,
}: {
  code: string;
  children?: React.ReactNode | string;
  changeContent?: string;
}) => {
  return `${getCommonsHighlight.tag.component({
    componentName: "Tooltip",
    props: changeContent || code,
    children: `
      ${children}
    `,
  })}`;
};
