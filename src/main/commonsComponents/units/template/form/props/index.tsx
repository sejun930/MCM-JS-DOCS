import _SubTitleTemplate from "../../title/subTitle";
import ModulePropsListFormPage from "./list";

import { Wrapper } from "../form.commons.styles";

import { MutableRefObject } from "react";
import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";

import { propsModuleList } from "src/commons/data/props/props.commons.data";

// Props Data Form 페이지
export default function _PropsForm({
  propsRef,
}: {
  propsRef: MutableRefObject<HTMLDivElement>;
}) {
  const [module] = useRecoilState(moduleState);

  return (
    <Wrapper ref={propsRef} id="props-form">
      <_SubTitleTemplate
        title="Props List"
        className="props-subTitle"
        remakrs="Props들을 이용해 원하는 모듈을 조립해보세요."
      />
      <ModulePropsListFormPage list={propsModuleList[module]} />
    </Wrapper>
  );
}
