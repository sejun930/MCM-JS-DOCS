import { ExampleCodeListTypes } from "src/main/commonsComponents/units/template/form/howUse/index.types";
import { getCommonsHighlight } from "src/commons/highlight";

import { getBoldCode } from "src/main/commonsComponents/functional/code";
import { alertCommonsExampleCode } from "./alert.example.commons.code";

export const alertCodeList: ExampleCodeListTypes = {
  default: () =>
    getCommonsHighlight.getComma([alertCommonsExampleCode.children("hello")]),
  basic: () =>
    getCommonsHighlight.getComma([
      getBoldCode({ code: alertCommonsExampleCode.children("hello") }),
    ]),
  delay: () =>
    `${getCommonsHighlight.getComma([
      alertCommonsExampleCode.children("10초 후 종료됩니다."),
      `         ` + getBoldCode({ code: alertCommonsExampleCode.delay(10000) }),
    ])}`,
  close: (isSwipe?: boolean) =>
    `${getCommonsHighlight.getComma([
      alertCommonsExampleCode.children(isSwipe ? "Swipe Me!" : "Click Me!"),
      `         ` + alertCommonsExampleCode.delay(10000),
      `         ` +
        getBoldCode({
          code: alertCommonsExampleCode.closeMode(isSwipe || false),
        }),
    ])} `,
  concept: (text: string, concept: string) =>
    `${getCommonsHighlight.getComma([
      alertCommonsExampleCode.children(text),
      `         ` +
        getBoldCode({ code: alertCommonsExampleCode.concept(concept) }),
    ])}`,
  styles: () =>
    `${alertCommonsExampleCode.children(
      "웹과 모바일에 스타일이 적용됩니다."
    )}${getCommonsHighlight.comma()}
          ${getBoldCode({
            code: alertCommonsExampleCode.styles(),
            width: "260px",
          })}`,
  responsiveStyles: (isMobile?: boolean) =>
    `${alertCommonsExampleCode.children(
      `${isMobile ? "모바일" : "웹"}에만 스타일이 적용됩니다.`
    )}${getCommonsHighlight.comma()}
          ${getBoldCode({
            code: alertCommonsExampleCode.responsiveStyles(isMobile),
            width: isMobile ? "470px" : "460px",
          })}`,
  custom: () =>
    `${alertCommonsExampleCode.children(
      "커스텀 된 컨셉입니다."
    )}${getCommonsHighlight.comma()}
          ${getBoldCode({
            code: alertCommonsExampleCode.custom(),
            // width: "460px",
          })}`,
  id: () =>
    `${alertCommonsExampleCode.children(
      "이 알럿은 한번만 오픈됩니다."
    )}${getCommonsHighlight.comma()}
          ${getBoldCode({ code: alertCommonsExampleCode.id() })}`,
  infinite: () =>
    `${alertCommonsExampleCode.children(
      "이 알럿은 무한하게 실행됩니다."
    )}${getCommonsHighlight.comma()}
          ${getBoldCode({
            code: alertCommonsExampleCode.delay("infinite"),
          })}${getCommonsHighlight.comma()}
          ${alertCommonsExampleCode.closeMode()}`,
};

export const alertReturnCommonsData = ({
  code,
  children,
  changeContent,
}: {
  code: string;
  children?: React.ReactNode | string;
  changeContent?: string;
}) => {
  return getCommonsHighlight.tag.button({
    children: ` ${children}`,
    clickEvent: {
      hasStartSpace: true,
      eventName: `
        <span class="blue3">Alert</span>.openAlert`,
      useArrow: true,
      props: getCommonsHighlight.curly({
        className: "deepPurple",
        children: `
          ${code}
        `,
      }),
    },
  });
};
