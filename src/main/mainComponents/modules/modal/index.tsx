import { ModulesInfoWrapper } from "./modal.styles";
import { exampleList } from "./example/data";

import Template from "src/main/commonsComponents/units/template/main";
import _MainTitleTemplate from "src/main/commonsComponents/units/template/title/mainTitle";
import _HowUseForm from "src/main/commonsComponents/units/template/form/howUse";
import _ExampleForm from "src/main/commonsComponents/units/template/form/example";

export default function MyModal() {
  return (
    <Template>
      <_MainTitleTemplate />
      <ModulesInfoWrapper>
        <_HowUseForm />
        <_ExampleForm exampleList={exampleList} />
      </ModulesInfoWrapper>
    </Template>
  );
}
