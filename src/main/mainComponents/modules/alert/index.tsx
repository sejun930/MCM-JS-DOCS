import Template from "src/main/commonsComponents/units/template/main";
import _MainTitleTemplate from "src/main/commonsComponents/units/template/title/mainTitle";
import _HowUseForm from "src/main/commonsComponents/units/template/form/howUse";

import { alertCodeList } from "./example/alert.example.code.data";
import { getCommonsHighlight } from "src/commons/highlight";

export default function MyAlert() {
  return (
    <Template>
      <_MainTitleTemplate />
      <_HowUseForm
        codeInfo={alertCodeList}
        exmapleContents={getCommonsHighlight.colors("Open Alert").text}
      />
    </Template>
  );
}
