import { ExampleIProps } from "src/main/commonsComponents/units/template/form/example/template.example.types";
import { ModalExampleAddTypes } from "../modal.types";

// Modal default Props값
export const initModalProps: ModalExampleAddTypes = {
  onBGAnimation: false, // 배경 애니메이션 여부
  onModalOpenAnimation: false, // 모달 오픈 애니메이션 여부
};

// 모듈별 사용 예시 데이터
export const exampleList: Array<ExampleIProps> = [
  {
    title: "기본 (Basic)",
    remakrs: "제일 기본적으로 실행되는 Modal 입니다.",
    contents: [
      {
        addProps: {},
        buttonName: "Open Basic Modal",
      },
    ],

    // isFull: true,
  },
  // {
  //   title: "애니메이션 적용",
  //   // buttonName: "Open Animation Modal",
  //   // type: "animation",
  // },
  // {
  //   title: "닫기 버튼 관련",
  //   // buttonName: "Open Animation Modal",
  //   // type: "animation",
  //   isFull: true,
  // },
];
