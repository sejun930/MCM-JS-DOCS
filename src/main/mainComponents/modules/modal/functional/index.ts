import { FunctionalListType } from "src/commons/data/functional/functional.commons.data";

export const ModalFunctionalList: FunctionalListType[] = [
  {
    name: "open",
    remakrs: "모달을 실행하는 함수입니다.",
    props: { isSameContents: true, list: [] },
  },
  {
    name: "close",
    remakrs:
      "최하위의 모달을 종료하는 함수이며, 선택자를 지정해 상위의 모달을 종료시킬 수 있습니다.",
    props: {
      list: [
        {
          name: "id",
          notice: "해당 id 선택자로 설정된 모달을 종료합니다.",
          type: "String",
          default: "-",
        },
        {
          name: "className",
          notice: "해당 class 선택자로 설정된 모달을 종료합니다.",
          type: "String",
          default: "-",
        },
      ],
    },
  },
];
