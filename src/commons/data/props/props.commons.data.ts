import { modalPropsList } from "src/main/mainComponents/modules/modal/props/modal.propsList";
import { tooltipPropsList } from "src/main/mainComponents/modules/tooltip/props/tooltip.propsList";

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
    | "[Function]";
  notice: string;
  isRequired?: boolean;
}

// 공통으로 사용되는 Props
export const commonsPropsList: Array<PropsModuleListType> = [
  {
    name: "id",
    default: '""',
    type: "String",
    notice: "모듈에 id 선택자 값을 지정합니다. id는 wrapper 태그에 적용됩니다.",
  },
  {
    name: "className",
    default: '""',
    type: "String",
    notice:
      "모듈에 class 선택자 값을 지정합니다. className은 wrapper 태그에 적용됩니다.",
  },
];

// 공통 props가 적용된 props 리스트 가져오기
const getWithCommnsPropsList = (list: Array<PropsModuleListType>) => {
  // 마지막 필수 props index
  const lastRequiredIdx =
    list.findLastIndex((el) => el.isRequired) || list.length;

  return [
    ...list.slice(0, lastRequiredIdx + 1), // 필수 props 인덱스까지 자르기
    ...commonsPropsList, // 공통 props 추가하기
    ...list.slice(lastRequiredIdx + 1), // 나머지 props 붙이기
  ];
};

export const propsModuleList: {
  [key: string]: Array<PropsModuleListType>;
} = {
  Modal: getWithCommnsPropsList(modalPropsList),
  Tooltip: getWithCommnsPropsList(tooltipPropsList),
};
