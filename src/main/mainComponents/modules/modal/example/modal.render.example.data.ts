import { ExampleIProps } from "src/main/commonsComponents/units/template/form/example/template.example.types";
import { ModalExampleInitTypes } from "../modal.types";

// Modal default Props값
export const modalExampleInitProps: ModalExampleInitTypes = {
  onBGAnimation: false, // 배경 애니메이션 여부
  onModalOpenAnimation: false, // 모달 오픈 애니메이션 여부
};

// 모듈별 사용 예시 데이터
export const modalExampleList: Array<ExampleIProps> = [
  {
    title: "기본 (Basic)",
    remakrs: "제일 기본적으로 실행되는 Modal 입니다.",
    contents: [
      {
        addProps: { onBGAnimation: false, onModalOpenAnimation: false },
        info: {
          buttonName: "Open Basic Modal",
        },
        children: `기본 모달 페이지입니다.`,
      },
    ],
  },
  {
    title: "애니메이션 ON",
    remakrs: "애니메이션이 적용된 Modal 입니다.",
    contents: [
      // {
      //   addProps: { onBGAnimation: true, onModalOpenAnimation: true },
      //   info: {
      //     buttonName: "Open Animation Modal",
      //   },
      // },
    ],
  },
];
