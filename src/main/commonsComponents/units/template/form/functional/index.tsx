import { ReactNode, MutableRefObject } from "react";
import { useRecoilState } from "recoil";

import { PropsModuleListResultType } from "../props/props.types";
import { moduleState, versState } from "src/commons/store";
import { Wrapper } from "../form.commons.styles";

import _SubTitleTemplate from "../../title/subTitle";
import FunctionalDetailInfoListPage from "./list";

export interface FunctionalListType {
  name: string; // 부가기능 이름
  remakrs: string; // 간단 설명
  props: {
    isSameContents?: boolean; // 본문의 props와 동일한지?
    list?: Array<PropsModuleListResultType>; // props 리스트 정보
  };
  info?: Array<string>; // 추가 정보
  exampleCode: string; // 예시용 코드
  setExampleCode?: ReactNode; // 예시 실행 코드
  id: string; // id 선택자 설정
}

// 부가 기능에 대한 폼
export default function _FunctionalForm({
  functionalList,
}: {
  functionalList: Array<FunctionalListType>;
}) {
  const [module] = useRecoilState(moduleState);
  const [vers] = useRecoilState(versState);

  return (
    (functionalList && functionalList.length && (
      <Wrapper id="functional-form">
        <_SubTitleTemplate
          title="Functional"
          className="functional-form"
          remakrs="추가로 사용할 수 있는 부가 기능들도 있어요."
        />
        <FunctionalDetailInfoListPage
          module={module}
          vers={vers}
          list={functionalList}
          isFunctional={true}
        />
      </Wrapper>
    )) || <></>
  );
}
