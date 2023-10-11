import React from "react";

import { getCommonsHighlight } from "src/commons/highlight";
import { ExampleCodeListTypes } from "src/main/commonsComponents/units/template/form/howUse/index.types";
import { tooltipCommonsExampleCode } from "./tooltip.example.commons.code";
import { getBoldCode } from "src/main/commonsComponents/functional/code";

// Tooltip 각각의 예시 코드를 저장하는 객체
export const tooltipCodeList: ExampleCodeListTypes = {
  default: (text?: string) =>
    ` ${tooltipCommonsExampleCode.tooltipString(text || "World")}`,
  basic: (text?: string) =>
    ` ${getBoldCode({
      code: tooltipCommonsExampleCode.tooltipString(text || "World"),
      propsName: "tooltipText",
    })}`,
  basicImg: () => ` 
      ${getBoldCode({
        code: tooltipCommonsExampleCode.tooltipObject(
          `${getCommonsHighlight.tag.img(
            getCommonsHighlight.props(
              "src",
              getCommonsHighlight.string("이미지 주소")
            )
          )}`
        ),
        propsName: "tooltipText",
      })}
    `,
  animation: () =>
    ` ${tooltipCommonsExampleCode.tooltipString("World")} ${getBoldCode({
      code: tooltipCommonsExampleCode.useAnimation,
      propsName: "useShowAnimation",
    })}`,
  animationImg: () => ` 
      ${tooltipCommonsExampleCode.tooltipObject(
        `${getCommonsHighlight.tag.img(
          getCommonsHighlight.props(
            "src",
            getCommonsHighlight.string("이미지 주소")
          )
        )}`
      )}
      ${getBoldCode({
        code: tooltipCommonsExampleCode.useAnimation,
        propsName: "useShowAnimation",
      })}
    `,
  position: (
    tooltipText: string,
    position: "top" | "bottom" | "left" | "right"
  ) =>
    `
     ${tooltipCodeList.default(tooltipText)}
      ${tooltipCommonsExampleCode.useAnimation}
      ${getBoldCode({
        code: tooltipCommonsExampleCode.position(position || "top"),
        propsName: "position",
      })} ${
      (position === "top" && getCommonsHighlight.colors("생략 가능").comment) ||
      ""
    }
    `,
  styles: () => `
     ${tooltipCodeList.default("New Style Tooltip")}
     ${getBoldCode({
       code: tooltipCommonsExampleCode.styles(),
       propsName: "tooltipStyles",
     })}
    `,
  mobileStyles: () => `
     ${tooltipCodeList.default("New Mobile Style Tooltip")}
     ${getBoldCode({
       code: tooltipCommonsExampleCode.styles(true),
       propsName: "tooltipMobileStyles",
     })}
   `,
  disable: () =>
    `${tooltipCodeList.default("New Style Tooltip")} ${getBoldCode({
      code: tooltipCommonsExampleCode.disable(),
      propsName: "isDisable",
    })}`,
  onoff: () =>
    `${tooltipCodeList.default(
      "New Style Tooltip"
    )} ${tooltipCommonsExampleCode.onoff()}`,
  offHover: () =>
    `
     ${tooltipCodeList.default("Already fixed")} 
      ${tooltipCommonsExampleCode.offHover()}
      ${tooltipCommonsExampleCode.onoff()}
    `,
  hideMobile: () =>
    `
     ${tooltipCodeList.default("모바일에서는 보이지 않습니다.")} 
      ${tooltipCommonsExampleCode.offHover()}
      ${tooltipCommonsExampleCode.onoff()}
      ${getBoldCode({
        code: tooltipCommonsExampleCode.hideMobile(),
        propsName: "hideMobile",
      })}
    `,
  fix: () =>
    `
     ${tooltipCodeList.default("고정된 Tooltip 입니다.")} 
      ${tooltipCommonsExampleCode.onoff()}
      ${getBoldCode({
        code: tooltipCommonsExampleCode.isFix(),
        propsName: "isFix",
      })}
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
