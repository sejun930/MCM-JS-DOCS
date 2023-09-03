import React from "react";
import { ExampleCommonsTypes } from "src/commons/data/example/example.commons.data";
import { modalCommonsExampleCode } from "./modal.example.commons.code";
import { getCommonsHighlight } from "src/commons/highlight";

import { removeTag } from "src/main/commonsComponents/functional/code";
import { ExampleCodeListTypes } from "src/main/commonsComponents/units/template/form/howUse/index.types";
import { getBoldCode } from "src/main/commonsComponents/functional/code";

// 해당 모듈을 실행하기 위한 공통적인 준비물
export const modalCommonsData: Array<ExampleCommonsTypes> = [
  // prettier-ignore
  {
    code: `
  ${getCommonsHighlight.colors("모달을 실행하거나 종료 시킬 수 있는 state 값을 설정합니다").comment}
  ${getCommonsHighlight.state("isOpen", getCommonsHighlight.colors("false").bool)}
  
  ${getCommonsHighlight.colors("모달을 실행하는 함수입니다.").comment}
  ${getCommonsHighlight.makeFunction({
    funcName : "openModal",
    children : getCommonsHighlight.function({
      funcName : "setIsOpen",
      setFunc : {
        color : "blue",
        children : getCommonsHighlight.colors("true").bool
      }
    })
  })}
  
  ${getCommonsHighlight.colors("모달을 종료하는 함수입니다.").comment}
  ${getCommonsHighlight.makeFunction({
    funcName : "closeModal",
    children : getCommonsHighlight.function({
      funcName : "setIsOpen",
      setFunc : {
        color : "blue",
        children : getCommonsHighlight.colors("false").bool
      }
    })
  })}
  `,
    import: { react: ["useState"] },
  },
  // prettier-ignore
  {
    code: `
    `,
  },
];

// 리턴될 때에 공통적으로 들어가는 코드 데이터
export const modalReturnCommonsData = ({
  code,
  children,
  changeContent, // content form 사용 여부, true일 경우 사용하지 않음
  funcName, // 사용될 함수명
}: {
  code: string;
  children?: React.ReactNode | string;
  changeContent?: string;
  funcName?: string;
}): Array<string> => {
  children = removeTag(typeof children === "string" ? children : "");

  return [
    getCommonsHighlight.tag.div(`
      ${getCommonsHighlight.tag.button({
        children: getCommonsHighlight.colors("모달 실행하기").text,
        clickEvent: {
          eventName: "openModal",
        },
      })}
      ${getCommonsHighlight.tag.component({
        componentName: "Modal",
        props: ` ${code}`,
        children: getCommonsHighlight.tag.span(
          typeof children === "string" ? children : ""
        ),
        childrenSpace: `
        `,
        endSpace: `
      `,
      })}
    `),
    `${getCommonsHighlight.tag.button({
      children: getCommonsHighlight.colors("모달 실행하기").text,
      endSpace: `
      `,
      clickEvent: {
        useArrow: true,
        code: `
        <span class='blue3'>Modal</span><span class='lightGray'>.</span><span class='lightYellow'>${
          funcName || "open"
        }</span><span class='yellow'>(</span><span class='deepPurple'>{</span> 
          <span class='skyblue'>children:</span> ${
            (!changeContent &&
              `${getCommonsHighlight.tag.span(
                typeof children === "string" ? children : ""
              )}<span class='lightGray'>,</span>`) ||
            changeContent
          }${
          code
            ? `
          ${code}`
            : ""
        } 
        <span class='deepPurple'>}</span><span class='yellow'>)</span>
      `,
        hasStartSpace: true,
      },
    })}`,
  ];
};

// Modal 각각의 예시 코드를 저장하는 객체
export const modalCodeList = (idx: number): ExampleCodeListTypes => {
  const ExampleCode = modalCommonsExampleCode(idx === 1 ? "object" : "props");

  return {
    title: () => ["With State", "Use in Function"],
    default: () => [`${ExampleCode.show} ${ExampleCode.onCloseModal}`, ``],
    basic: () => [
      `${getBoldCode({
        code: ExampleCode.show,
        propsName: "show",
      })} ${getBoldCode({
        code: ExampleCode.onCloseModal,
        propsName: "onCloseModal",
      })}`,
      ``,
    ],
    animation: () => [
      `
        ${ExampleCode.show}
        ${ExampleCode.onCloseModal}
        ${
          getCommonsHighlight.colors(
            "모달을 실행 및 종료할 때 배경 애니메이션을 적용합니다."
          ).comment
        }
        ${getBoldCode({ code: ExampleCode.showBGAnimation })}
        ${
          getCommonsHighlight.colors(
            "모달을 실행 및 종료할 때 모달 애니메이션을 적용합니다."
          ).comment
        }
        ${getBoldCode({ code: ExampleCode.showModalOpenAnimation })}
      `,
      `${getCommonsHighlight.getComma([
        getCommonsHighlight.colors(
          "모달을 실행 및 종료할 때 배경 애니메이션을 적용합니다."
        ).comment,
        `         ` + getBoldCode({ code: ExampleCode.showBGAnimation }),
        `         ` +
          getCommonsHighlight.colors(
            "모달을 실행 및 종료할 때 모달 애니메이션을 적용합니다."
          ).comment,
        `         ` + getBoldCode({ code: ExampleCode.showModalOpenAnimation }),
      ])}`,
    ],
    size300: () => [
      `
        ${ExampleCode.show}
        ${ExampleCode.onCloseModal}
        ${getBoldCode({ code: ExampleCode.modalSize("300px", "300px") })}
      `,
      `${getCommonsHighlight.getComma([
        // ExampleCode.onCloseModal,
        getBoldCode({ code: ExampleCode.modalSize("300px", "300px") }),
      ])}`,
    ],
    sizePercent: () => [
      `
        ${ExampleCode.show}
        ${ExampleCode.onCloseModal}
        ${getBoldCode({ code: ExampleCode.modalSize("30%", "40%") })}
      `,
      `${getCommonsHighlight.getComma([
        // ExampleCode.onCloseModal,
        getBoldCode({ code: ExampleCode.modalSize("30%", "40%") }),
      ])}`,
    ],
    responsive: () => [
      `
        ${ExampleCode.show}
        ${ExampleCode.onCloseModal}
        ${getBoldCode({ code: ExampleCode.mobileModalSize("50%", "50%") })}
      `,
      `${getCommonsHighlight.getComma([
        getBoldCode({ code: ExampleCode.mobileModalSize("50%", "50%") }),
      ])}`,
    ],
    modalStyle: () => [
      `
        ${ExampleCode.show}
        ${ExampleCode.onCloseModal}
        ${getBoldCode({ code: ExampleCode.modalStyles })}
      `,
      `${getBoldCode({ code: ExampleCode.modalStyles })}`,
    ],
    mobileModalStyles: () => [
      `
        ${ExampleCode.show}
        ${ExampleCode.onCloseModal}
        ${getBoldCode({ code: ExampleCode.mobileModalStyles })}
      `,
      `${getBoldCode({ code: ExampleCode.mobileModalStyles })}`,
    ],
    hideCloseButton: () => [
      `
        ${ExampleCode.show} 
        ${ExampleCode.onCloseModal} 
        ${getBoldCode({ code: ExampleCode.hideCloseButton })}
      `,
      `${getBoldCode({
        code: getCommonsHighlight.getComma([ExampleCode.hideCloseButton]),
      })}`,
    ],
    addCloseMent: () => [
      `
        ${ExampleCode.show}
        ${ExampleCode.onCloseModal}
        ${getBoldCode({ code: ExampleCode.closeMent("오늘 하루 보지 않기") })}
      `,
      `${getCommonsHighlight.getComma([
        getBoldCode({ code: ExampleCode.closeMent("오늘 하루 보지 않기") }),
      ])}`,
    ],
    resizeBtn: () => [
      `
        ${ExampleCode.show}
        ${ExampleCode.onCloseModal}
        ${getBoldCode({ code: ExampleCode.closeButtonInfo })}
      `,
      `${getCommonsHighlight.getComma([
        // ExampleCode.onCloseModal,
        getBoldCode({ code: ExampleCode.closeButtonInfo }),
      ])}`,
    ],
    offAutoClose: () => [
      `
        ${ExampleCode.show}
        ${ExampleCode.onCloseModal}
        ${ExampleCode.closeMent("닫기")}
        ${getBoldCode({ code: ExampleCode.offAutoClose })}
      `,
      `${getCommonsHighlight.getComma([
        ExampleCode.closeMent("닫기"),
        `         ` + getBoldCode({ code: ExampleCode.offAutoClose }),
      ])}`,
    ],
    selectClose: () => [
      ``,
      `${getCommonsHighlight.getComma([
        getBoldCode({
          code: getCommonsHighlight.obj(
            "id",
            getCommonsHighlight.string("parents-modal")
          ),
        }),
        `         ` + ExampleCode.showBGAnimation,
        `         ` + ExampleCode.showModalOpenAnimation,
      ])}`,
    ],
    onFixWindow: () => [
      `
        ${ExampleCode.show}
        ${ExampleCode.onCloseModal}
        ${getBoldCode({ code: ExampleCode.onFixWindow })}
      `,
      `${getCommonsHighlight.getComma([
        getBoldCode({ code: ExampleCode.onFixWindow }),
      ])}`,
    ],
    autoCloseTimer: () => [
      `
        ${ExampleCode.show}
        ${ExampleCode.onCloseModal}
        ${ExampleCode.showBGAnimation}
        ${ExampleCode.showModalOpenAnimation}
        ${ExampleCode.hideCloseButton}
        ${ExampleCode.offAutoClose}
        ${getBoldCode({ code: ExampleCode.autoCloseTimer(2000) })}
      `,
      `${getCommonsHighlight.getComma([
        ExampleCode.showBGAnimation,
        `         ` + ExampleCode.showModalOpenAnimation,
        `         ` + ExampleCode.hideCloseButton,
        `         ` + ExampleCode.offAutoClose,
        `         ` + getBoldCode({ code: ExampleCode.autoCloseTimer(2000) }),
      ])}`,
    ],
  };
};
