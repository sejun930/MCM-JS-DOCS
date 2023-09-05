import { modalPropsList } from "src/main/mainComponents/modules/modal/props/modal.propsList";
import { tooltipPropsList } from "src/main/mainComponents/modules/tooltip/props/tooltip.propsList";
import { sliderPropsList } from "src/main/mainComponents/modules/slider/props/slider.propsList";

import { getPropsForm } from "./props.commons.code";

export type PropsCodeTypes = {
  type: "function" | "bool" | "string" | "obj" | "number" | "array";
  argu?: any;
};

export interface PropsModuleListType {
  name: string;
  default: any;
  type:
    | "Boolean"
    | "String"
    | "Number"
    | "Function"
    | "Object"
    | "Node"
    | "String | Node"
    | "[Boolean]"
    | "[String]"
    | "[Number]"
    | "[Object]"
    | "[Function]"
    | "[Node]";
  notice: string;
  isRequired?: boolean;
  code: PropsCodeTypes;
  // code: string | Array<string>;
}

type OmitCodeType = Omit<PropsModuleListType, "code">;
export type PropsModuleListResultType = OmitCodeType & {
  code: string;
};

// 공통으로 사용되는 Props
export const commonsPropsList: (
  vers?: number
) => Array<PropsModuleListResultType> = (vers?: number) => [
  getPropsForm(
    {
      name: "id",
      default: '""',
      type: "String",
      notice:
        "모듈에 id 선택자 값을 지정합니다. id는 wrapper 태그에 적용됩니다.",
      code: { type: "string" },
    },
    Boolean(vers)
  ),
  getPropsForm(
    {
      name: "className",
      default: '""',
      type: "String",
      notice:
        "모듈에 class 선택자 값을 지정합니다. className은 wrapper 태그에 적용됩니다.",
      code: { type: "string" },
    },
    Boolean(vers)
  ),
];

// 공통 props가 적용된 props 리스트 가져오기
const getWithCommnsPropsList = (
  list: Array<PropsModuleListResultType>,
  vers?: number
) => {
  if (!list) return [];

  // 마지막 필수 props index
  const lastRequiredIdx = list.findIndex((el) => !el.isRequired);

  return [
    ...list.slice(0, lastRequiredIdx), // 필수 props 인덱스까지 자르기
    ...commonsPropsList(vers || 0), // 공통 props 추가하기
    ...list.slice(lastRequiredIdx), // 나머지 props 붙이기
  ];
};

export const propsModuleList: (vers?: number) => {
  [key: string]: Array<PropsModuleListResultType>;
} = (vers?: number) => {
  return {
    Modal: getWithCommnsPropsList(modalPropsList(vers || 0), vers),
    Tooltip: getWithCommnsPropsList(tooltipPropsList),
    Slider: getWithCommnsPropsList(sliderPropsList),
  };
};
