import { ExampleCodeListTypes } from "src/main/commonsComponents/units/template/form/howUse/index.types";
import { getCommonsHighlight } from "src/commons/highlight";
import { sliderCommonsExampleCode } from "./slider.example.commons.code";

import { getBoldCode } from "src/main/commonsComponents/functional/code";

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
  hideArrow: () =>
    ` 
      ${sliderCommonsExampleCode.useAnimation} 
      ${sliderCommonsExampleCode.pagination}
      ${getBoldCode({
        code: sliderCommonsExampleCode.hideArrow,
        propsName: "hideArrow",
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
  useDragMode: () =>
    `
      ${sliderCommonsExampleCode.useAnimation} 
      ${getBoldCode({
        code: sliderCommonsExampleCode.useDragMode,
        propsName: "useDragMode",
      })} 
    `,
  firstPage: () =>
    `
      ${sliderCommonsExampleCode.useAnimation} 
      ${getBoldCode({
        code: sliderCommonsExampleCode.firstPage,
        propsName: "firstPage",
      })} 
    `,
};

export const sliderReturnCommonsData = ({
  code,
  children,
  changeContent,
}: {
  code: string;
  children?: React.ReactNode | string;
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
      ${getCommonsHighlight.tag.p(getCommonsHighlight.colors("World").text)}
      ${getCommonsHighlight.tag.img(
        getCommonsHighlight.props(
          "src",
          getCommonsHighlight.string("이미지 주소")
        )
      )}`;
