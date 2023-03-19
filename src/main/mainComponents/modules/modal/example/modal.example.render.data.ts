import { ExampleIProps } from "src/main/commonsComponents/units/template/form/example/template.example.types";
import { ModalPropsType } from "mcm-js/dist/commons/types";
import { modalCodeList } from "./modal.example.code.data";

// Modal default Props값
export const modalExampleInitProps: ModalPropsType = {
  showBGAnimation: false, // 배경 애니메이션 여부
  showModalOpenAnimation: false, // 모달 오픈 애니메이션 여부
  show: false,
  onCloseModal: () => {},
};

// 모듈별 사용 예시 데이터
export const modalExampleList: Array<ExampleIProps> = [
  {
    title: "기본 (Basic)",
    contents: [
      {
        remakrs: "제일 기본적으로 실행되는 모달입니다.",
        info: {
          buttonName: "Open Basic Modal",
        },
        children: `기본 모달 페이지입니다.`,
        code: modalCodeList.basic,
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
        children: `애니메이션이 적용된 모달입니다.`,
        code: modalCodeList.animation,
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
          styles: { width: "300px", height: "300px" },
        },
        info: {
          buttonName: "Open width 300px, height 300px Modal",
        },
        children: `크기가 300px로 설정된 모달입니다.`,
        code: modalCodeList.size300,
      },
      {
        remakrs: "width 30%, height : 40% 크기의 모달을 만들 수 있습니다.",
        addProps: {
          ...modalExampleInitProps,
          styles: { width: "30%", height: "40%" },
        },
        info: {
          buttonName: "Open width 30%, height 40% Modal",
        },
        children: `%로 크기 설정된 모달입니다.`,
        code: modalCodeList.sizePercent,
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
          styles: { width: "767px" },
          mobileDefaultStyles: { width: "50%", height: "50%" },
        },
        info: {
          buttonName: "Open Mobile Responsive Modal",
        },
        children: `모바일에서만 width 50%, height 50% 크기를 가집니다.`,
        code: modalCodeList.responsive,
      },
    ],
  },
  {
    title: "모달 닫기 관련",
    isFull: true,
    contents: [
      {
        remakrs: "닫기 버튼을 사용하지 않을 수도 있습니다.",
        addProps: { ...modalExampleInitProps, hideCloseButton: true },
        info: {
          buttonName: "Open Hide Close Button Modal",
        },
        children: `닫기 버튼이 사라진 모달입니다.`,
        code: modalCodeList.responsive,
      },
      {
        remakrs: "닫기 버튼을 사용하지 않을 수도 있습니다.",
        info: {
          buttonName: "Open Hide Close Button Modal",
        },
        children: `닫기 버튼이 사라진 모달입니다.`,
        code: modalCodeList.responsive,
      },
    ],
  },
];
