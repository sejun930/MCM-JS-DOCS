import { PropsModuleListType } from "../props/props.commons.data";

export interface FunctionalListType {
  name: string; // 부가기능 이름
  remakrs: string; // 간단 설명
  props: {
    isSameContents?: boolean; // 본문의 props와 동일한지?
    list: Array<PropsModuleListType>; // props 리스트 정보
  };
}

import { ModalFunctionalList } from "src/main/mainComponents/modules/modal/functional";

export const functionalList: { [key: string]: Array<FunctionalListType> } = {
  Modal: ModalFunctionalList,
};
