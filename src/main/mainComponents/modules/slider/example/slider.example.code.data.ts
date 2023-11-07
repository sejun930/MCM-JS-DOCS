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
  usePagination: () =>
    ` 
      ${sliderCommonsExampleCode.useAnimation} 
      ${getBoldCode({
        code: sliderCommonsExampleCode.usePagination,
        propsName: "usePagination",
      })}
    `,
  useCurrentPage: () =>
    `
      ${sliderCommonsExampleCode.useAnimation} 
      ${getBoldCode({
        code: sliderCommonsExampleCode.useCurrentPage,
        propsName: "useCurrentPage",
      })}
    `,

  setArrow: (value: "hide" | "showHover" | "contents") =>
    ` 
      ${sliderCommonsExampleCode.useAnimation} 
      ${sliderCommonsExampleCode.usePagination}
      ${sliderCommonsExampleCode.useSwipeMode("50")}
      ${getBoldCode({
        code: sliderCommonsExampleCode.setArrow(value),
        propsName: "setArrow",
      })}
    `,
  autoPlay: () =>
    `
      ${sliderCommonsExampleCode.useAnimation} 
      ${sliderCommonsExampleCode.usePagination}
      ${getBoldCode({
        code: sliderCommonsExampleCode.autoPlay,
        propsName: "useAutoPlay",
      })}
    `,
  autoPlayWithTimer: () =>
    `
      ${sliderCommonsExampleCode.useAnimation} 
      ${sliderCommonsExampleCode.usePagination}
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
      ${sliderCommonsExampleCode.usePagination}
      ${getBoldCode({
        code: sliderCommonsExampleCode.firstPage,
        propsName: "firstPage",
      })} 
    `,
  minHeight: () =>
    `
      ${sliderCommonsExampleCode.useAnimation}
      ${sliderCommonsExampleCode.usePagination}
      ${getBoldCode({
        code: sliderCommonsExampleCode.listMinHeight,
        propsName: "listMinHeight",
      })} 
    `,
  changePageEvent: () =>
    `
        ${sliderCommonsExampleCode.useAnimation}
        ${sliderCommonsExampleCode.usePagination}
        ${sliderCommonsExampleCode.autoPlay}
        ${getBoldCode({
          code: sliderCommonsExampleCode.changePageEvent,
          propsName: "changePageEvent",
        })} 
      `,
  stopInfinite: () =>
    `
      ${sliderCommonsExampleCode.useAnimation}
      ${sliderCommonsExampleCode.useSwipeMode("50")}
      ${sliderCommonsExampleCode.usePagination}
      ${sliderCommonsExampleCode.timer}
      ${getBoldCode({
        code: sliderCommonsExampleCode.stopInfinite,
        propsName: "stopInfinite",
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
  getCommonsHighlight.colors("Hello World").text
)}
      ${getCommonsHighlight.tag.p(getCommonsHighlight.colors("😃🧑😀").text)}
      ${getCommonsHighlight.tag.img(
        getCommonsHighlight.props(
          "src",
          getCommonsHighlight.string("이미지 주소")
        )
      )}`;
