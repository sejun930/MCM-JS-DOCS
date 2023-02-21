import { ModulesInfoWrapper } from "./modal.styles";

import Template from "src/main/commonsComponents/units/template/main";
import _MainTitleTemplate from "src/main/commonsComponents/units/template/title/mainTitle";
import _HowUseForm from "src/main/commonsComponents/units/template/form/howUse";

export default function MyModal() {
  return (
    <Template>
      <_MainTitleTemplate />
      <ModulesInfoWrapper>
        <_HowUseForm title="사용 방법" />
        {/* <_SubTitleTemplate title="사용 방법">123</_SubTitleTemplate> */}
      </ModulesInfoWrapper>
    </Template>
  );
}
