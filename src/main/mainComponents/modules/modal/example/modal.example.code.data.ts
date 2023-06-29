import React from "react";
import { ExampleCommonsTypes } from "src/commons/data/example/example.commons.data";
import { modalCommonsExampleCode } from "./modal.example.commons.code";
import { getCommonsHighlight } from "src/commons/highlight";

import { removeTag } from "src/main/commonsComponents/functional";

export interface ExampleCodeListTypes {
  [key: string]: string[];
}

// 해당 모듈을 실행하기 위한 공통적인 준비물
export const modalCommonsData: Array<ExampleCommonsTypes> = [
  // prettier-ignore
  {
    code: `
  ${getCommonsHighlight.comment("모달을 실행하거나 종료 시킬 수 있는 state 값을 설정합니다")}
  <span class='darkBlue'>const</span> <span class='deepPurple'>[</span><span class='blue'>isOpen</span><span class='lightGray'>,</span> <span class='lightYellow'>setIsOpen</span><span class='deepPurple'>]</span> <span class='lightGray'>=</span> <span class='lightYellow'>useState</span><span class='deepPurple'>(</span><span class='blue'>false</span><span class='deepPurple'>)</span><span class='lightGray'>;</span>
  
  ${getCommonsHighlight.comment("모달을 실행하는 함수입니다.")}
  <span class='darkBlue'>const</span> <span class='lightYellow'>openModal</span> <span class='lightGray'>=</span> <span class='deepPurple'>()</span> <span class='blue'>=></span> <span class='deepPurple'>{</span>
    <span class='lightYellow'>setIsOpen</span><span class='blue'>(true)</span><span class='lightGray'>;</span>
  <span class='deepPurple'>}</span><span class='lightGray'>;</span>
  
  ${getCommonsHighlight.comment("모달을 종료하는 함수입니다.")}
  <span class='darkBlue'>const</span> <span class='lightYellow'>closeModal</span> <span class='lightGray'>=</span> <span class='deepPurple'>()</span> <span class='blue'>=></span> <span class='deepPurple'>{</span>
    <span class='lightYellow'>setIsOpen</span><span class='blue'>(false)</span><span class='lightGray'>;</span>
  <span class='deepPurple'>}</span><span class='lightGray'>;</span>
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
  text,
  changeContent, // content form 사용 여부, true일 경우 사용하지 않음
  funcName, // 사용될 함수명
}: {
  code: string;
  text?: React.ReactNode | string;
  changeContent?: string;
  funcName?: string;
}): Array<string> => {
  text = removeTag(typeof text === "string" ? text : "");

  return [
    getCommonsHighlight.tag.div(`
      ${getCommonsHighlight.tag.button({
        children: getCommonsHighlight.text("모달 실행하기 "),
        clickEvent: {
          // useArrow: true,
          eventName: "openModal",
          // code: "bbb",
        },
      })}
      ${getCommonsHighlight.tag.component({
        componentName: "Modal",
        props: ` ${code}`,
        children: getCommonsHighlight.tag.span(
          typeof text === "string" ? text : ""
        ),
        childrenSpace: `
        `,
        endSpace: `
      `,
      })}
    `),
    `${getCommonsHighlight.tag.button({
      children: getCommonsHighlight.text("모달 실행하기"),
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
                typeof text === "string" ? text : ""
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
  return {
    title: ["With State", "Use in Function"],
    basic: [
      `${modalCommonsExampleCode.show[idx]} ${modalCommonsExampleCode.onCloseModal[idx]}`,
      ``,
    ],
    animation: [
      `
        ${modalCommonsExampleCode.show[idx]}
        ${modalCommonsExampleCode.onCloseModal[idx]}
        ${modalCommonsExampleCode.showBGAnimation[idx]}
        ${modalCommonsExampleCode.showModalOpenAnimation[idx]}
      `,
      `${getCommonsHighlight.getComma([
        modalCommonsExampleCode.showBGAnimation[idx],
        `         ` + modalCommonsExampleCode.showModalOpenAnimation[idx],
      ])}`,
    ],
    size300: [
      `
        ${modalCommonsExampleCode.show[idx]}
        ${modalCommonsExampleCode.onCloseModal[idx]}
        ${modalCommonsExampleCode.modalSize("300px", "300px")[idx]}
      `,
      `${getCommonsHighlight.getComma([
        // modalCommonsExampleCode.onCloseModal[idx],
        modalCommonsExampleCode.modalSize("300px", "300px")[idx],
      ])}`,
    ],
    sizePercent: [
      `
        ${modalCommonsExampleCode.show[idx]}
        ${modalCommonsExampleCode.onCloseModal[idx]}
        ${modalCommonsExampleCode.modalSize("30%", "40%")[idx]}
      `,
      `${getCommonsHighlight.getComma([
        // modalCommonsExampleCode.onCloseModal[idx],
        modalCommonsExampleCode.modalSize("30%", "40%")[idx],
      ])}`,
    ],
    responsive: [
      `
        ${modalCommonsExampleCode.show[idx]}
        ${modalCommonsExampleCode.onCloseModal[idx]}
        ${modalCommonsExampleCode.mobileModalSize[idx]}
      `,
      `${getCommonsHighlight.getComma([
        modalCommonsExampleCode.mobileModalSize[idx],
      ])}`,
    ],
    modalStyle: [
      `
        ${modalCommonsExampleCode.show[idx]}
        ${modalCommonsExampleCode.onCloseModal[idx]}
        ${modalCommonsExampleCode.modalStyles[idx]}
      `,
      `${modalCommonsExampleCode.modalStyles[idx]}`,
    ],
    mobileModalStyles: [
      `
        ${modalCommonsExampleCode.show[idx]}
        ${modalCommonsExampleCode.onCloseModal[idx]}
        ${modalCommonsExampleCode.mobileModalStyles[idx]}
      `,
      `${modalCommonsExampleCode.mobileModalStyles[idx]}`,
    ],
    hideCloseButton: [
      `${modalCommonsExampleCode.show[idx]} ${modalCommonsExampleCode.onCloseModal[idx]} ${modalCommonsExampleCode.hideCloseButton[idx]}`,
      `${getCommonsHighlight.getComma([
        modalCommonsExampleCode.hideCloseButton[idx],
      ])}`,
    ],
    addCloseMent: [
      `
        ${modalCommonsExampleCode.show[idx]}
        ${modalCommonsExampleCode.onCloseModal[idx]}
        ${modalCommonsExampleCode.closeMent("오늘 하루 보지 않기")[idx]}
      `,
      `${getCommonsHighlight.getComma([
        // modalCommonsExampleCode.onCloseModal[idx],
        modalCommonsExampleCode.closeMent("오늘 하루 보지 않기")[idx],
      ])}`,
    ],
    resizeBtn: [
      `
        ${modalCommonsExampleCode.show[idx]}
        ${modalCommonsExampleCode.onCloseModal[idx]}
        ${modalCommonsExampleCode.closeButtonInfo[idx]}
      `,
      `${getCommonsHighlight.getComma([
        // modalCommonsExampleCode.onCloseModal[idx],
        modalCommonsExampleCode.closeButtonInfo[idx],
      ])}`,
    ],
    offAutoClose: [
      `
        ${modalCommonsExampleCode.show[idx]}
        ${modalCommonsExampleCode.onCloseModal[idx]}
        ${modalCommonsExampleCode.offAutoClose[idx]}
        ${modalCommonsExampleCode.closeMent("닫기")[idx]}
      `,
      `${getCommonsHighlight.getComma([
        modalCommonsExampleCode.offAutoClose[idx],
      ])}`,
    ],
    selectClose: [
      ``,
      `${getCommonsHighlight.getComma([
        `<span class='skyblue'>id:</span> <span class='lightOrange'>"parents-modal"</span>`,
        `         ` + modalCommonsExampleCode.showBGAnimation[idx],
        `         ` + modalCommonsExampleCode.showModalOpenAnimation[idx],
      ])}`,
    ],
    onFixWindow: [
      `
        ${modalCommonsExampleCode.show[idx]}
        ${modalCommonsExampleCode.onCloseModal[idx]}
        ${modalCommonsExampleCode.onFixWindow[idx]}
      `,
      `${getCommonsHighlight.getComma([
        modalCommonsExampleCode.onFixWindow[idx],
      ])}`,
    ],
    autoCloseTimer: [
      `
        ${modalCommonsExampleCode.show[idx]}
        ${modalCommonsExampleCode.onCloseModal[idx]}
        ${modalCommonsExampleCode.timer(2000)[idx]}
        ${modalCommonsExampleCode.showBGAnimation[idx]}
        ${modalCommonsExampleCode.showModalOpenAnimation[idx]}
        ${modalCommonsExampleCode.offAutoClose[idx]}
        ${modalCommonsExampleCode.hideCloseButton[idx]}
      `,
      `${getCommonsHighlight.getComma([
        modalCommonsExampleCode.timer(2000)[idx],
        `         ` + modalCommonsExampleCode.showBGAnimation[idx],
        `         ` + modalCommonsExampleCode.showModalOpenAnimation[idx],
        `         ` + modalCommonsExampleCode.offAutoClose[idx],
        `         ` + modalCommonsExampleCode.hideCloseButton[idx],
      ])}`,
    ],
  };
};
// {
//   title: "Use in Function",
//   basic: ,
// },
