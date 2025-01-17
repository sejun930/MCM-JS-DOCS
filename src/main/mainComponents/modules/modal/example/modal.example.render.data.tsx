import { ExampleIProps } from "src/main/commonsComponents/units/template/form/example/template.example.types";
import { ModalPropsType } from "mcm-js/dist/commons/types";
import { modalCodeList } from "./modal.example.code.data";
import { modalCommonsExampleCode } from "./modal.example.commons.code";
import { CloseMultipleModal } from "./modal.example.template";
import { getCommonsHighlight } from "src/commons/highlight";

import { getBoldCode } from "src/main/commonsComponents/functional/code";

// Modal default Props값
export const modalExampleInitProps: ModalPropsType = {
  showBGAnimation: false, // 배경 애니메이션 여부
  showModalOpenAnimation: false, // Modal 오픈 애니메이션 여부
  show: false,
  onCloseModal: () => {},
};

// 모듈별 사용 예시 데이터
export const modalExampleList = (idx: number): Array<ExampleIProps> => [
  {
    title: "기본 (Basic)",
    contents: [
      {
        remakrs: "제일 기본적으로 실행되는 Modal 입니다.",
        info: {
          buttonName: "Open Basic Modal",
        },
        content: `기본 Modal 페이지입니다.`,
        code: modalCodeList(idx).basic,
      },
    ],
  },
  {
    title: "애니메이션 (Animation) 적용",
    contents: [
      {
        remakrs: "애니메이션이 적용되어 좀더 활동적인 Modal을 제공합니다.",
        addProps: {
          ...modalExampleInitProps,
          showBGAnimation: true,
          showModalOpenAnimation: true,
        },
        info: {
          buttonName: "Open Animation Modal",
        },
        content: `애니메이션이 적용된 Modal 입니다.`,
        code: modalCodeList(idx).animation,
      },
    ],
  },
  {
    title: "크기 조절",
    // isFull: true,
    contents: [
      {
        remakrs: "width 300px, height : 300px 크기의 Modal을 만들 수 있습니다.",
        addProps: {
          ...modalExampleInitProps,
          modalSize: { width: "300px", height: "300px" },
        },
        info: {
          buttonName: "Open width 300px, height 300px Modal",
        },
        content: `크기가 300px로 설정된 Modal 입니다.`,
        code: modalCodeList(idx).size300,
      },
      {
        remakrs: "width 30%, height : 40% 크기의 Modal을 만들 수 있습니다.",
        addProps: {
          ...modalExampleInitProps,
          modalSize: { width: "30%", height: "40%" },
        },
        info: {
          buttonName: "Open width 30%, height 40% Modal",
        },
        content: `%로 크기 설정된 Modal 입니다.`,
        code: modalCodeList(idx).sizePercent,
      },
    ],
  },
  {
    title: "모바일 반응형 조절",
    // isFull: true,
    contents: [
      {
        remakrs: "모바일(767px 이하)에서의 크기를 별도로 조절할 수도 있습니다.",
        addProps: {
          ...modalExampleInitProps,
          modalSize: { width: "767px" },
          mobileModalSize: { width: "50%", height: "50%" },
        },
        info: {
          buttonName: "Open Mobile Responsive Modal",
        },
        content: `모바일(767px 이하)에서만 width 50%, height 50% 크기를 가집니다.`,
        code: modalCodeList(idx).responsive,
      },
    ],
  },
  {
    title: "스타일 적용 (웹, 모바일)",
    blockRemarks:
      "Modal의 스타일을 웹/모바일 및 태그 영역으로 각각 설정할 수 있습니다.",
    isFull: { isHalf: false },
    contents: [
      {
        remakrs:
          "(웹과 모바일 동일 적용) 각각의 태그에 스타일을 직접 지정할 수 있습니다.",
        addProps: {
          ...modalExampleInitProps,
          modalStyles: {
            wrapper: {
              backgroundColor: "rgba(30, 0, 50, 0.7)",
            },
            items: {
              backgroundColor: "black",
              border: "double 6px white",
              borderRadius: "0px",
              width: "250px",
              height: "250px",
            },
            closeButton: {
              backgroundColor: "black",
              borderRadius: "100%",
              border: "solid 1px white",
              marginTop: "-10px",
            },
            contents: {
              backgroundColor: "white",
              width: "90%",
            },
          },
        },
        info: {
          buttonName: "Open Custom Styles of Web Modal",
        },
        content:
          "wrapper, items, closeButton, contents 태그의 스타일을 각각 지정할 수 있습니다.",
        code: modalCodeList(idx).modalStyle,
      },
      {
        remakrs:
          "(모바일 : 767px 이하에서만 적용) 각각의 태그에 스타일을 직접 지정할 수 있습니다.",
        addProps: {
          ...modalExampleInitProps,
          mobileModalStyles: {
            wrapper: {
              backgroundColor: "rgba(100, 0, 50, 0.7)",
            },
            items: {
              backgroundColor: "black",
              border: "double 6px white",
              borderRadius: "0px",
              width: "50%",
              height: "40%",
            },
            closeButton: {
              backgroundColor: "black",
              borderRadius: "0",
              border: "solid 1px white",
              marginTop: "-10px",
            },
            contents: {
              backgroundColor: "white",
              height: "50%",
            },
          },
        },
        info: {
          buttonName: "Open Custom Styles of Mobile Modal",
        },
        content:
          "모바일 환경에서만 적용되는 wrapper, items, closeButton, contents 태그의 스타일을 각각 지정할 수 있습니다.",
        code: modalCodeList(idx).mobileModalStyles,
      },
    ],
  },
  {
    title: "Modal 닫기 관련",
    blockRemarks:
      "Modal 안에서 사용할 수 있는 닫기 버튼에 대한 설정을 지정할 수 있습니다.",
    isFull: { isHalf: false },
    contents: [
      {
        remakrs: "닫기 버튼을 사용하지 않을 수도 있습니다.",
        addProps: {
          ...modalExampleInitProps,
          hideCloseButton: true,
        },
        info: {
          buttonName: "Open Hide Close Button Modal",
        },
        content: `닫기 버튼이 사라진 Modal 입니다.`,
        code: modalCodeList(idx).hideCloseButton,
      },
      {
        remakrs: "닫기에 대한 설명을 덧붙일 수 있습니다.",
        addProps: {
          ...modalExampleInitProps,
          closeMent: "오늘 하루 보지 않기",
        },
        info: {
          buttonName: "Open Add CloseMent Button Modal",
        },
        content: `닫기에 대한 설명이 추가됩니다.`,
        code: modalCodeList(idx).addCloseMent,
      },
      {
        remakrs: "닫기 버튼 사이즈, 굵기, 색상을 조절합니다.",
        addProps: {
          ...modalExampleInitProps,
          closeButtonInfo: {
            buttonSize: "35px",
            buttonWeight: 4,
            buttonColor: "#FFBB5C",
          },
        },
        info: {
          buttonName: "Open Resize Button Modal",
        },
        content: `닫기 버튼의 사이즈와 굵기, 색상등의 스타일이 조절됩니다.`,
        code: modalCodeList(idx).resizeBtn,
      },
    ],
  },
  {
    title: "자동 종료 (auto-close) 방지",
    contents: [
      {
        remakrs: "외부 영역을 선택해도 Modal이 종료되지 않습니다.",
        addProps: {
          ...modalExampleInitProps,
          offAutoClose: true,
          closeMent: "닫기",
        },
        info: {
          buttonName: "Open Off Auto-close Modal",
        },
        content: `닫기 버튼을 클릭해야만 실행되어 있는 Modal을 닫을 수 있습니다.`,
        code: modalCodeList(idx).offAutoClose,
      },
    ],
  },
  {
    title: "자동 종료 예약",
    contents: [
      {
        remakrs: "원하는 시간 (1/1000초) 후에 Modal을 자동으로 종료시킵니다.",
        addProps: {
          ...modalExampleInitProps,
          autoCloseTimer: 2000,
          showBGAnimation: true,
          showModalOpenAnimation: true,
          offAutoClose: true,
          hideCloseButton: true,
        },
        info: {
          buttonName: "Open Auto Close Timer Modal",
        },
        content: `2초 후에 Modal이 자동으로 종료됩니다.`,
        code: modalCodeList(idx).autoCloseTimer,
      },
    ],
  },
  {
    title: "스크롤 방지",
    contents: [
      {
        remakrs: "Modal이 실행되면 스크롤 이동을 방지합니다.",
        addProps: {
          ...modalExampleInitProps,
          onFixWindow: true,
        },
        info: {
          buttonName: "Open Fix Window",
        },
        content: `이 Modal이 실행되는 동안에는 스크롤을 제어할 수 없습니다.`,
        code: modalCodeList(idx).onFixWindow,
      },
    ],
  },
  {
    title: "",
    isError: {
      requiredList: ["show", "onCloseModal"],
    },
    isHide: [false, true][idx],
    contents: [
      {
        addProps: {
          ...modalExampleInitProps,
          offAutoClose: true,
          closeMent: "닫기",
          // @ts-ignore
          show: undefined,
          // @ts-ignore
          onCloseModal: undefined,
        },
        info: {
          buttonName: "Open Off Auto-close Modal",
        },
        content: `닫기 버튼을 클릭해야만 실행되어 있는 Modal을 닫을 수 있습니다.`,
        code: null,
      },
    ],
  },
  {
    title: "Modal 선택 종료",
    isHide: [true, false][idx],
    contents: [
      {
        remakrs:
          "여러개의 Modal 중 id 또는 class 선택자가 지정된 Modal을 선택해서 종료할 수 있습니다.",
        addProps: {
          ...modalExampleInitProps,
          id: "parents-modal",
          showBGAnimation: true,
          showModalOpenAnimation: true,
          // @ts-ignore
          children: CloseMultipleModal(),
        },
        info: {
          buttonName: "Close Selected Modal",
        },
        // 새로운 content 사용
        changeContent: `<span class='blue'>(</span>
            ${getCommonsHighlight.tag.div(
              `
              ${getCommonsHighlight.tag.span("상위 Modal")}
              ${getCommonsHighlight.tag.component({
                componentName: "Modal",
                childrenSpace: `
                `,
                props: `
                <span class='skyblue'>show</span><span class='lightGray'>=</span><span class='yellow'>{</span><span class='darkBlue'>true</span><span class='yellow'>}</span>
                <span class='skyblue'>onCloseModal</span><span class='lightGray'>=</span><span class='yellow'>{</span><span class='deepPurple'>()</span> <span class='darkBlue'>=></span> ${getBoldCode(
                  {
                    code: `<span class='blue3'>Modal</span><span class='lightGray'>.</span><span class='lightYellow'>close</span><span class='purple'>(</span><span class='blue'>{</span> <span class='skyblue'>id:</span> <span class='lightOrange'>"parents-modal"</span> <span class='blue'>}</span><span class='purple'>)</span>`,
                    id: "modal-close-functional-wrapper",
                    propsName: "modalClose",
                  }
                )}<span class='yellow'>}</span>
                ${modalCommonsExampleCode("props").showBGAnimation}
                ${modalCommonsExampleCode("props").showModalOpenAnimation}
                ${modalCommonsExampleCode("props").modalSize("400px", "400px")}
                ${modalCommonsExampleCode("props").mobileModalSize(
                  "50%",
                  "50%"
                )}
              `,
                children: getCommonsHighlight.tag.span(
                  "하위 Modal을 종료하면 상위 Modal도 함께 종료됩니다."
                ),
                endSpace: `
              `,
                // isClose: true,
              })}`,
              `
            `
            )}
          <span class='blue'>)</span>${getCommonsHighlight.colors(",").text}`,
        content: `하위 Modal을 종료하면 상위 Modal도 함께 종료됩니다.`,
        code: modalCodeList(idx).selectClose,
      },
    ],
  },
];

export const modalFunctionalData: any = [null, 2];
