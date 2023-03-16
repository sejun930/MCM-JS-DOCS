import {
  modalCommonsData,
  modalReturnCommonsData,
} from "src/main/mainComponents/modules/modal/example/modal.example.code.data";

export interface ExampleCommonsTypes {
  code: string;
  import?: {
    [key: string]: string | string[];
  };
}

// 예시용 코드에 import될 추가 코드들
export const exampleCommonsList: { [key: string]: ExampleCommonsTypes } = {
  Modal: modalCommonsData,
};

export const exampleCommonsReturnList: {
  [key: string]: (code: string) => string;
} = {
  Modal: (code: string) => modalReturnCommonsData(code),
};
