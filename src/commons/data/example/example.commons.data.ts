import React from "react";
import {
  modalCommonsData,
  modalReturnCommonsData,
} from "src/main/mainComponents/modules/modal/example/modal.example.code.data";
import { tooltipReturnCommonsData } from "src/main/mainComponents/modules/tooltip/example/tooltip.example.code.data";
import { sliderReturnCommonsData } from "src/main/mainComponents/modules/slider/example/slider.example.code.data";
import { alertReturnCommonsData } from "src/main/mainComponents/modules/alert/example/alert.example.code.data";

export interface ExampleCommonsTypes {
  code: string;
  import?: {
    [key: string]: string | string[];
  };
}

// 예시용 코드에 import될 추가 코드들
export const exampleCommonsList: {
  [key: string]: Array<ExampleCommonsTypes> | ExampleCommonsTypes | null;
} = {
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
  ) => Array<string> | string;
} => {
  return {
    Modal: (code: string, children?: React.ReactNode | string) =>
      modalReturnCommonsData({ code, children, changeContent, funcName }),
    Tooltip: (code: string, children?: React.ReactNode | string) =>
      tooltipReturnCommonsData({ code, children, changeContent }),
    Slider: (code: string, children?: React.ReactNode | string) =>
      sliderReturnCommonsData({ code, children, changeContent }),
    Alert: (code: string, children?: React.ReactNode | string) =>
      alertReturnCommonsData({ code, children, changeContent, funcName }),
  };
};
