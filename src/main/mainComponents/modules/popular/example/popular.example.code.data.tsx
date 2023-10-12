import React from "react";

import { ExampleCommonsTypes } from "src/commons/data/example/example.commons.data";
import { getCommonsHighlight } from "src/commons/highlight";
import { ExampleCodeListTypes } from "src/main/commonsComponents/units/template/form/howUse/index.types";
import {
  popularCommonsExampleCode,
  popularCommonsExampleCodeForm,
} from "./popular.example.commons.code";
import { getBoldCode } from "src/main/commonsComponents/functional/code";

export const popularCodeList: ExampleCodeListTypes = {
  default: () => ` `,
  basic: () => popularCommonsExampleCode.list(),
  minHeight: (web?: number, mobile?: number) =>
    getBoldCode({
      code: popularCommonsExampleCode.minHeight(web, mobile),
      propsName: "minHeight",
    }),
  delay: (delay: number) =>
    getBoldCode({
      code: popularCommonsExampleCode.delay(String(delay)),
      propsName: "delay",
    }),
  styles: () =>
    getBoldCode({
      code: popularCommonsExampleCode.styles(),
      propsName: "popularStyles",
    }),
  responsiveStyles: () =>
    getBoldCode({
      code: popularCommonsExampleCode.responsiveStyles(),
      propsName: "popularResponsiveStyles",
    }),
  hideList: () =>
    getBoldCode({
      code: popularCommonsExampleCode.setList(
        popularCommonsExampleCodeForm.hideList
      ),
      propsName: "setList",
    }),
  showRating: () =>
    getBoldCode({
      code: popularCommonsExampleCode.setList(
        popularCommonsExampleCodeForm.showRating
      ),
      propsName: "setList",
    }),
  hoverStyles: () =>
    getBoldCode({
      code: popularCommonsExampleCode.setList(
        popularCommonsExampleCodeForm.hoverStyles
      ),
      propsName: "setList",
    }),
  listStyles: () =>
    getBoldCode({
      code: popularCommonsExampleCode.setList(
        popularCommonsExampleCodeForm.listStyles
      ),
      propsName: "setList",
    }),
  useSwipeMode: () =>
    getBoldCode({
      code: popularCommonsExampleCode.useSwipeMode(),
      propsName: "useSwipeMode",
    }),
};

export const popularReturnCommonsData = ({
  code,
  children,
  changeContent,
}: {
  code: string;
  children?: React.ReactNode | string;
  changeContent?: string;
}) => {
  const hasCode = code.includes("class");

  return getCommonsHighlight.tag.component({
    componentName: "Popular",
    isClose: true,
    props:
      changeContent ||
      `
      ${popularCommonsExampleCode.list()} ${
        (!hasCode &&
          getCommonsHighlight.colors("노출할 리스트를 입력합니다. (필수)")
            .comment) ||
        ""
      }
      ${popularCommonsExampleCode.minHeight()} ${
        (!hasCode &&
          getCommonsHighlight.colors("모듈의 최소 높이값을 지정합니다. (필수)")
            .comment) ||
        ""
      } ${
        (hasCode &&
          `
      ${code}
    `) ||
        `
    `
      }`,
  });
};

export const popularCommonsData: ExampleCommonsTypes = {
  code: `
  ${
    getCommonsHighlight.colors(
      "노출될 리스트들을 state 값에 저장합니다. (권장)"
    ).comment
  }
  ${getCommonsHighlight.state({
    hideSetEvent: true,
    stateName: "list",
    stateValue: getCommonsHighlight.array({
      arr: [
        `
    ${getCommonsHighlight.tag.p("서해안 골뱅이 500g")}`,
        `
    ${getCommonsHighlight.tag.p("허니레몬 캔디 450p 1.26kg, 1개")}`,
        `
    ${getCommonsHighlight.tag.p("프로틴 더블 리치 초콜릿 맛, 2.268kg")}`,
        `
    ${getCommonsHighlight.tag.p("국내산 논 우렁살 (냉장), 180g, 1개")}`,
        `
    ${getCommonsHighlight.tag.p("[원두커피1kg] 갓 볶은 신선한 원두커피 1kg")}
  `,
      ],
      className: "blue",
    }),
  })}
  `,
  import: { react: ["useState"] },
};
