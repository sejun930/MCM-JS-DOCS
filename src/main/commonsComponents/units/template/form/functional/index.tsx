import { functionalList } from "src/commons/data/functional/functional.commons.data";

import { useRecoilState } from "recoil";
import { moduleState, versState } from "src/commons/store";

import { Wrapper } from "../form.commons.styles";

import _SubTitleTemplate from "../../title/subTitle";
import FunctionalDetailInfoListPage from "./list";
import { MutableRefObject } from "react";

// 부가 기능에 대한 폼
export default function _FunctionalForm({
  propsRef,
}: {
  propsRef?: MutableRefObject<HTMLDivElement>; // props 페이지의 시작 위치
}) {
  const [module] = useRecoilState(moduleState);
  const [vers] = useRecoilState(versState);

  return (
    (functionalList[module] && functionalList[module].length && (
      <Wrapper id="functional-form">
        <_SubTitleTemplate
          title="Functional"
          className="functional-form"
          remakrs="추가로 사용할 수 있는 부가 기능들도 있어요."
        />
        <FunctionalDetailInfoListPage
          module={module}
          vers={vers}
          list={functionalList[module]}
          propsRef={propsRef}
          isFunctional={true}
        />
      </Wrapper>
    )) || <></>
  );
}
