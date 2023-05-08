import { ExampleIProps } from "src/main/commonsComponents/units/template/form/example/template.example.types";
import { ModalPropsType } from "mcm-js/dist/commons/types";
import { modalCodeList } from "./modal.example.code.data";
import { modalCommonsExampleCode } from "./modal.example.commons.code";
import { CloseMultipleModal } from "./modal.example.template";

// Modal default Props값
export const modalExampleInitProps: ModalPropsType = {
  showBGAnimation: false, // 배경 애니메이션 여부
  showModalOpenAnimation: false, // 모달 오픈 애니메이션 여부
  show: false,
  onCloseModal: () => {},
};

// 모듈별 사용 예시 데이터
export const modalExampleList = (idx: number): Array<ExampleIProps> => [
  {
    title: "기본 (Basic)",
    contents: [
      {
        remakrs: "제일 기본적으로 실행되는 모달입니다.",
        info: {
          buttonName: "Open Basic Modal",
        },
        content: `기본 모달 페이지입니다.`,
        code: modalCodeList(idx).basic,
      },
    ],
  },
  {
    title: "애니메이션 (Animation) 적용",
    contents: [
      {
        remakrs: "애니메이션이 적용되어 좀더 활동적인 모달을 제공합니다.",
        addProps: {
          ...modalExampleInitProps,
          showBGAnimation: true,
          showModalOpenAnimation: true,
        },
        info: {
          buttonName: "Open Animation Modal",
        },
        content: `애니메이션이 적용된 모달입니다.`,
        code: modalCodeList(idx).animation,
      },
    ],
  },
  {
    title: "크기 조절",
    // isFull: true,
    contents: [
      {
        remakrs: "width 300px, height : 300px 크기의 모달을 만들 수 있습니다.",
        addProps: {
          ...modalExampleInitProps,
          modalSize: { width: "300px", height: "300px" },
        },
        info: {
          buttonName: "Open width 300px, height 300px Modal",
        },
        content: `크기가 300px로 설정된 모달입니다.`,
        code: modalCodeList(idx).size300,
      },
      {
        remakrs: "width 30%, height : 40% 크기의 모달을 만들 수 있습니다.",
        addProps: {
          ...modalExampleInitProps,
          modalSize: { width: "30%", height: "40%" },
        },
        info: {
          buttonName: "Open width 30%, height 40% Modal",
        },
        content: `%로 크기 설정된 모달입니다.`,
        code: modalCodeList(idx).sizePercent,
      },
    ],
  },
  {
    title: "모바일 반응형 조절",
    // isFull: true,
    contents: [
      {
        remakrs: "모바일에서의 크기를 별도로 조절할 수도 있습니다.",
        addProps: {
          ...modalExampleInitProps,
          modalSize: { width: "767px" },
          mobileModalSize: { width: "50%", height: "50%" },
        },
        info: {
          buttonName: "Open Mobile Responsive Modal",
        },
        content: `모바일에서만 width 50%, height 50% 크기를 가집니다.`,
        code: modalCodeList(idx).responsive,
      },
    ],
  },
  {
    title: "모달 닫기 관련",
    isFull: true,
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
        content: `닫기 버튼이 사라진 모달입니다.`,
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
        remakrs: "닫기 버튼 사이즈를 조절합니다.",
        addProps: {
          ...modalExampleInitProps,
          closeButtonInfo: {
            buttonSize: "35px",
          },
        },
        info: {
          buttonName: "Open Resize Button Modal",
        },
        content: `닫기 버튼의 사이즈가 조절됩니다.`,
        code: modalCodeList(idx).resizeBtn,
      },
    ],
  },
  {
    title: "자동 종료 (auto-close) 방지",
    contents: [
      {
        remakrs: "외부 영역을 선택해도 모달이 종료되지 않습니다.",
        addProps: {
          ...modalExampleInitProps,
          offAutoClose: true,
          closeMent: "닫기",
        },
        info: {
          buttonName: "Open Off Auto-close Modal",
        },
        content: `닫기 버튼을 클릭해야만 모달창을 닫을 수 있습니다.`,
        code: modalCodeList(idx).offAutoClose,
      },
    ],
  },
  {
    title: "",
    isError: true,
    isHide: [false, true][idx],
    contents: [
      {
        remakrs:
          "Modal 모듈을 사용하기 위해서는 'show', 'onCloseModal' props가 필수로 전달되어야 합니다. 전달되지 않는다면 모듈을 실행할 수 없으므로 해당 에러메세지가 보여진다면 props 값을 다시 확인해주세요. ",
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
        content: `닫기 버튼을 클릭해야만 모달창을 닫을 수 있습니다.`,
        code: null,
      },
    ],
  },
  {
    title: "모달 선택 종료",
    isHide: [true, false][idx],
    contents: [
      {
        remakrs:
          "여러개의 모달 중 id 또는 class 선택자가 지정된 모달을 선택해서 종료할 수 있습니다.",
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
            <span><</span><span class='darkBlue'>div</span><span>></span>
              <span><</span><span class='darkBlue'>span</span><span>></span> <span class='lightGray'>상위 모달</span> <span><</span><span>/</span><span class='darkBlue'>span</span><span>></span>
              <span><</span><span class="green">Modal</span>
                <span class='skyblue'>show</span><span class='lightGray'>=</span><span class='yellow'>{</span><span class='darkBlue'>true</span><span class='yellow'>}</span>
                <span class='skyblue'>onCloseModal</span><span class='lightGray'>=</span><span class='yellow'>{</span><span class='deepPurple'>()</span> <span class='darkBlue'>=></span> <span class='blue3'>Modal</span><span class='lightGray'>.</span><span class='lightYellow'>close</span><span class='purple'>(</span><span class='blue'>{</span> <span class='skyblue'>id:</span> <span class='lightOrange'>"parents-modal"</span> <span class='blue'>}</span><span class='purple'>)</span><span class='yellow'>}</span>
                ${modalCommonsExampleCode.modalSize("400px", "400px")[0]}
                ${modalCommonsExampleCode.showBGAnimation[0]}
                ${modalCommonsExampleCode.showModalOpenAnimation[0]}
              <span>></span>
                <span class='lightGray'>하위 모달을 종료하면 상위 모달도 함께 종료됩니다.</span>
              <span><</span><span>/</span><span class="green">Modal</span><span>></span>
            <span><</span><span>/</span><span class='darkBlue'>div</span><span>></span>
          <span class='blue'>)</span><span class='lightGray'>,</span>`,
        content: `하위 모달을 종료하면 상위 모달도 함께 종료됩니다.`,
        code: modalCodeList(idx).selectClose,
      },
    ],
  },
];

export const modalFunctionalData: any = [null, 2];
