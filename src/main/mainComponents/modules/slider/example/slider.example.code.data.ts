import { ExampleCodeListTypes } from "src/main/commonsComponents/units/template/form/howUse/index.types";
import { getCommonsHighlight } from "src/commons/highlight";
import { sliderCommonsExampleCode } from "./slider.example.commons.code";

import { getBoldCode } from "src/main/commonsComponents/functional/code";
import { ReactNode } from "react";

export const sliderCodeList: ExampleCodeListTypes = {
  default: () => [``],
  useAnimation: () =>
    ` ${getBoldCode({
      code: sliderCommonsExampleCode.useAnimation,
      propsName: "useAnimation",
    })}`,
  pagination: () =>
    ` 
      ${sliderCommonsExampleCode.useAnimation} 
      ${getBoldCode({
        code: sliderCommonsExampleCode.pagination,
        propsName: "pagination",
      })}
    `,
  setArrow: (value: "hide" | "showHover" | "contents") =>
    ` 
      ${sliderCommonsExampleCode.useAnimation} 
      ${sliderCommonsExampleCode.pagination}
      ${sliderCommonsExampleCode.useSwipeMode("50")}
      ${getBoldCode({
        code: sliderCommonsExampleCode.setArrow(value),
        propsName: "setArrow",
      })}
    `,
  autoPlay: () =>
    `
      ${sliderCommonsExampleCode.useAnimation} 
      ${sliderCommonsExampleCode.pagination}
      ${getBoldCode({
        code: sliderCommonsExampleCode.autoPlay,
        propsName: "useAutoPlay",
      })}
    `,
  autoPlayWithTimer: () =>
    `
      ${sliderCommonsExampleCode.useAnimation} 
      ${sliderCommonsExampleCode.pagination}
      ${getBoldCode({
        code: sliderCommonsExampleCode.timer,
        propsName: "useAutoPlay",
      })}
    `,
  useSwipeMode: () =>
    `
      ${sliderCommonsExampleCode.useAnimation} 
      ${getBoldCode({
        code: sliderCommonsExampleCode.useSwipeMode(),
        propsName: "useSwipeMode",
      })} 
    `,
  firstPage: () =>
    `
      ${sliderCommonsExampleCode.useAnimation}
      ${sliderCommonsExampleCode.pagination}
      ${getBoldCode({
        code: sliderCommonsExampleCode.firstPage,
        propsName: "firstPage",
      })} 
    `,
  minHeight: () =>
    `
      ${sliderCommonsExampleCode.useAnimation}
      ${sliderCommonsExampleCode.pagination}
      ${getBoldCode({
        code: sliderCommonsExampleCode.listMinHeight,
        propsName: "listMinHeight",
      })} 
    `,
  changePageEvent: () =>
    `
        ${sliderCommonsExampleCode.useAnimation}
        ${sliderCommonsExampleCode.pagination}
        ${sliderCommonsExampleCode.autoPlay}
        ${getBoldCode({
          code: sliderCommonsExampleCode.changePageEvent,
          propsName: "changePageEvent",
        })} 
      `,
};

export const sliderReturnCommonsData = ({
  code,
  children,
  changeContent,
}: {
  code: string;
  children?: ReactNode | string;
  changeContent?: string;
}) => {
  return `${getCommonsHighlight.tag.component({
    componentName: "Slider",
    props: changeContent || code,
    children: `
      ${children}
    `,
  })}`;
};

// 공통으로 사용될 children 데이터
export const sliderDefaultChildren = `${getCommonsHighlight.tag.p(
  getCommonsHighlight.colors("Hello").text
)}
      ${getCommonsHighlight.tag.p(getCommonsHighlight.colors("😃🧑😀").text)}
      ${getCommonsHighlight.tag.img(
        getCommonsHighlight.props(
          "src",
          getCommonsHighlight.string("이미지 주소")
        )
      )}`;
