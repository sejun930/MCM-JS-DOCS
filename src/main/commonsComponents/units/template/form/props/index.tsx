import _SubTitleTemplate from "../../title/subTitle";
import ModulePropsListFormPage from "./list";

import { Wrapper } from "../form.commons.styles";

// Props Data Form 페이지
export default function _PropsForm() {
  return (
    <Wrapper>
      <_SubTitleTemplate
        title="Props List"
        className="props-subTitle"
        remakrs="Props들을 이용해 원하는 모듈을 조립해보세요."
      />
      <ModulePropsListFormPage />
    </Wrapper>
  );
}
