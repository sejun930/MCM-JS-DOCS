import React from "react";
import { ExampleCodeListTypes } from "src/main/commonsComponents/units/template/form/howUse/index.types";
import { getCommonsHighlight } from "src/commons/highlight";

import { getBoldCode } from "src/main/commonsComponents/functional/code";
import { alertCommonsExampleCode } from "./alert.example.commons.code";

export const alertCodeList: ExampleCodeListTypes = {
  default: () =>
    getCommonsHighlight.getComma([alertCommonsExampleCode.children("Hello")]),
  basic: () =>
    getCommonsHighlight.getComma([
      getBoldCode({
        code: alertCommonsExampleCode.children("Hello"),
        propsName: "children",
      }),
    ]),
  delay: () =>
    `${getCommonsHighlight.getComma([
      alertCommonsExampleCode.children("10초 후 종료됩니다."),
      `         ` +
        getBoldCode({
          code: alertCommonsExampleCode.delay(10000),
          propsName: "closeDelayTime",
        }),
    ])}`,
  close: (isSwipe?: boolean) =>
    `${getCommonsHighlight.getComma([
      alertCommonsExampleCode.children(isSwipe ? "Swipe Me!" : "Click Me!"),
      `         ` + alertCommonsExampleCode.delay(10000),
      `         ` +
        getBoldCode({
          code: alertCommonsExampleCode.closeMode(isSwipe || false),
          propsName: "useCloseMode",
        }),
    ])} `,
  concept: (text: string, concept: string) =>
    `${getCommonsHighlight.getComma([
      alertCommonsExampleCode.children(text),
      `         ` +
        getBoldCode({
          code: alertCommonsExampleCode.concept(concept),
          propsName: "alertConcept",
        }),
    ])}`,
  styles: () =>
    `${alertCommonsExampleCode.children(
      "웹과 모바일에 스타일이 적용됩니다."
    )}${getCommonsHighlight.comma()}
          ${getBoldCode({
            code: alertCommonsExampleCode.styles(),
            width: "260px",
            propsName: "alertStyles",
          })}`,
  responsiveStyles: (isMobile?: boolean) =>
    `${alertCommonsExampleCode.children(
      `${isMobile ? "모바일" : "웹"}에만 스타일이 적용됩니다.`
    )}${getCommonsHighlight.comma()}
          ${getBoldCode({
            code: alertCommonsExampleCode.responsiveStyles(isMobile),
            width: isMobile ? "470px" : "460px",
            propsName: "alertResponsiveStyles",
          })}`,
  custom: () =>
    `${alertCommonsExampleCode.children(
      "커스텀 된 컨셉입니다."
    )}${getCommonsHighlight.comma()}
          ${getBoldCode({
            code: alertCommonsExampleCode.custom(),
            propsName: "alertConcept",
          })}`,
  id: () =>
    `${alertCommonsExampleCode.children(
      "이 Alert은 한번만 오픈됩니다."
    )}${getCommonsHighlight.comma()}
          ${getBoldCode({
            code: alertCommonsExampleCode.id(),
            propsName: "id",
          })}`,
  infinite: () =>
    `${alertCommonsExampleCode.children(
      "이 Alert은 무한하게 실행됩니다."
    )}${getCommonsHighlight.comma()}
          ${getBoldCode({
            code: alertCommonsExampleCode.delay("infinite"),
            propsName: "closeDelayTime",
          })}${getCommonsHighlight.comma()}
          ${alertCommonsExampleCode.closeMode()}`,
  onAfterAlertOpen: () => `${alertCommonsExampleCode.children(
    "Hello"
  )}${getCommonsHighlight.comma()}
          ${getBoldCode({
            code: alertCommonsExampleCode.afterEvent(true),
            propsName: "onAfterAlertOpen",
          })}`,
  onAfterAlertClose: () => `${alertCommonsExampleCode.children(
    "Hello"
  )}${getCommonsHighlight.comma()}
          ${getBoldCode({
            code: alertCommonsExampleCode.afterEvent(false),
            propsName: "onAfterAlertClose",
          })}`,
};

export const alertReturnCommonsData = ({
  code,
  children,
  changeContent,
  funcName,
}: {
  code: string;
  children?: React.ReactNode | string;
  changeContent?: string;
  funcName?: string;
}) => {
  return [
    getCommonsHighlight.tag.button({
      children: ` ${children}`,
      clickEvent: {
        hasStartSpace: true,
        eventName: `
        <span class="blue3">Alert</span>.${funcName || "openAlert"}`,
        useArrow: true,
        props: getCommonsHighlight.curly({
          className: "deepPurple",
          children: `
          ${changeContent || code}
        `,
        }),
      },
    }),
  ];
};
