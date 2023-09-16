import Template from "src/main/commonsComponents/units/template/main";
import _MainTitleTemplate from "src/main/commonsComponents/units/template/title/mainTitle";
import _HowUseForm from "src/main/commonsComponents/units/template/form/howUse";
import _ExampleForm from "src/main/commonsComponents/units/template/form/example/template.example.container";
import _FunctionalForm from "src/main/commonsComponents/units/template/form/functional";
import _PropsForm from "src/main/commonsComponents/units/template/form/props";

import { alertCodeList } from "./example/alert.example.code.data";
import {
  alertExampleList,
  initAlertCommonsProps,
} from "./example/alert.example.render.data";
import { getCommonsHighlight } from "src/commons/highlight";
import { alertFunctionalList } from "./functional";
import { alertPropsList } from "./props/alert.propsList";

export default function MyAlert() {
  return (
    <Template>
      <_MainTitleTemplate />
      <_HowUseForm
        codeInfo={alertCodeList}
        exmapleContents={getCommonsHighlight.colors("Open Alert").text}
      />
      <_ExampleForm
        exampleList={alertExampleList()}
        initProps={initAlertCommonsProps}
        commonsProps={initAlertCommonsProps}
      />
      <_FunctionalForm functionalList={alertFunctionalList} />
      <_PropsForm list={alertPropsList} isObject={true} />
    </Template>
  );
}
