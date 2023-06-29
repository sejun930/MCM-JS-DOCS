import { ReactNode } from "react";
import { PropsModuleListType } from "../props/props.commons.data";

import ModalFunctionalList from "src/main/mainComponents/modules/modal/functional";

export interface FunctionalListType {
  name: string; // 부가기능 이름
  remakrs: string; // 간단 설명
  props: {
    isSameContents?: boolean; // 본문의 props와 동일한지?
    list: Array<PropsModuleListType>; // props 리스트 정보
  };
  exampleCode: string; // 예시용 코드
  info?: Array<string>; // 추가 정보
  setExampleCode?: ReactNode; // 예시 실행 코드
}

export const functionalList: { [key: string]: Array<FunctionalListType> } = {
  Modal: ModalFunctionalList(),
};
