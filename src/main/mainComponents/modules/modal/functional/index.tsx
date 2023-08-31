import { FunctionalListType } from "src/commons/data/functional/functional.commons.data";
import { getCommonsHighlight } from "src/commons/highlight";
import { modalCommonsExampleCode } from "../example/modal.example.commons.code";

import { OpenModalButton } from "../example/modal.example.template";
import { getLibraries } from "src/main/commonsComponents/functional";

import { getPropsForm } from "src/commons/data/props/props.commons.code";

const { Modal } = getLibraries();
export default function ModalFunctionalList(): FunctionalListType[] {
  return [
    {
      name: "open",
      remakrs: "모달을 실행하는 함수입니다.",
      props: { isSameContents: true, list: [] },
      exampleCode: `${getCommonsHighlight.tag.button({
        children: getCommonsHighlight.colors(" 모달 실행하기").text,
        clickEvent: {
          hasStartSpace: true,
          code: `
        <span class='blue3'>Modal</span><span class='lightGray'>.</span><span class='lightYellow'>open(</span><span class='deepPurple'>{</span>
          ${getCommonsHighlight.getComma([
            modalCommonsExampleCode.children("함수로 실행된 모달입니다.")[1],
            `         ` + modalCommonsExampleCode.showBGAnimation[1],
            `         ` + modalCommonsExampleCode.showModalOpenAnimation[1],
          ])}
        <span class='deepPurple'>}</span><span class='lightYellow'>)</span>
      `,
          useArrow: true,
        },
      })}`,
      setExampleCode: (
        <OpenModalButton
          onClickEvent={() =>
            Modal.open({
              children: <span>함수로 실행된 모달입니다.</span>,
              showBGAnimation: true,
              showModalOpenAnimation: true,
            })
          }
        >
          Modal Open Functional
        </OpenModalButton>
      ),
    },
    {
      name: "close",
      remakrs:
        "최하위의 모달을 종료하는 함수이며, 선택자를 지정해 상위의 모달을 종료시킬 수 있습니다.",
      props: {
        list: [
          getPropsForm({
            name: "id",
            notice: "해당 id 선택자로 설정된 모달을 종료합니다.",
            type: "String",
            default: "-",
            code: {
              type: "string",
            },
          }),
          getPropsForm({
            name: "className",
            notice: "해당 class 선택자로 설정된 모달을 종료합니다.",
            type: "String",
            default: "-",
            code: {
              type: "string",
            },
          }),
        ],
      },
      exampleCode: `${getCommonsHighlight.tag.button({
        children: getCommonsHighlight.colors(" 모달 실행하기").text,
        clickEvent: {
          hasStartSpace: true,
          code: `
        <span class='blue3'>Modal</span><span class='lightGray'>.</span><span class='lightYellow'>open(</span><span class='deepPurple'>{</span>
          ${getCommonsHighlight.getComma([
            `<span class='skyblue'>children:</span> <span class='blue'>(</span>
            <span><</span><span class='darkBlue'>button</span>
              <span class='skyblue'>onClick</span><span class='lightGray'>=</span><span class='yellow'>{</span><span class='deepPurple'>()</span> <span class='blue2'>=></span> <span class='deepPurple'>{</span>
                <span class='lightYellow'>alert</span><span class='blue'>(</span><span class='lightOrange'>"모달을 종료합니다."</span><span class='blue'>)</span><span class='lightGray'>;</span>
                <span class='blue3'>Modal</span><span class='lightGray'>.</span><span class='lightYellow'>close</span><span class='blue'>(</span><span class='yellow'>{</span> <span class='skyblue'>id:</span> <span class='lightOrange'>"modal"</span> <span class='yellow'>}</span><span class='blue'>)</span><span class='lightGray'>;</span>
              <span class='deepPurple'>}</span><span class='yellow'>}</span>
            <span>></span>
              <span class='lightGray'>모달 종료하기</span>
            <span><</span><span>/</span><span class='darkBlue'>button</span><span>></span>
          <span class='blue'>)</span>`,
            `         ` + modalCommonsExampleCode.showBGAnimation[1],
            `         ` + modalCommonsExampleCode.showModalOpenAnimation[1],
            `         <span class='skyblue'>id:</span> <span class='lightOrange'>"modal"</span>`,
          ])}
        <span class='deepPurple'>}</span><span class='lightYellow'>)</span>
      `,
          useArrow: true,
        },
      })}`,
      info: [
        "함수를 사용하지 않아도 열려있는 최하단 모달은 종료할 수 있습니다.",
        "id 선택자와 class 선택자가 중복으로 전달되면, <b>id 선택자가 우선</b>으로 지정됩니다.",
        "전달된 선택자와 <b>일치한 선택자가 없다면</b> 함수가 정상적으로 작동하지 않을 수도 있습니다.",
      ],
      setExampleCode: (
        <OpenModalButton
          onClickEvent={() =>
            Modal.open({
              children: (
                <button
                  onClick={() => {
                    alert("모달을 종료합니다.");
                    Modal.close({ id: "modal" });
                  }}
                >
                  모달 종료하기
                </button>
              ),
              showBGAnimation: true,
              showModalOpenAnimation: true,
              id: "modal",
            })
          }
        >
          Modal Close Functional
        </OpenModalButton>
      ),
    },
  ];
}
