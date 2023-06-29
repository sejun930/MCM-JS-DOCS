import React, { Children } from "react";
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
export const exampleCommonsList: { [key: string]: Array<ExampleCommonsTypes> } =
  {
    Modal: modalCommonsData,
  };

// 예시용 코드에 붙여지는 return 코드들
export const exampleCommonsReturnList = ({
  changeContent,
  funcName,
}: {
  changeContent: string; // 대체될 코드
  funcName?: string; // 사용할 함수명
}): {
  [key: string]: (
    code: string,
    children?: React.ReactNode | string
  ) => Array<string>;
} => {
  return {
    Modal: (code: string, children?: React.ReactNode | string) =>
      modalReturnCommonsData({ code, text: children, changeContent, funcName }),
  };
};
