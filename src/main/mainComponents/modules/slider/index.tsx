import Template from "src/main/commonsComponents/units/template/main";
import _MainTitleTemplate from "src/main/commonsComponents/units/template/title/mainTitle";
import _HowUseForm from "src/main/commonsComponents/units/template/form/howUse";
import _ExampleForm from "src/main/commonsComponents/units/template/form/example/template.example.container";

import { sliderExampleList } from "./example/slider.example.render.data";

import {
  sliderCodeList,
  sliderDefaultChildren,
} from "./example/slider.example.code.data";

export default function MySlider() {
  return (
    <Template>
      <_MainTitleTemplate />
      <_HowUseForm
        codeInfo={sliderCodeList}
        exmapleContents={sliderDefaultChildren}
      />
      <_ExampleForm exampleList={sliderExampleList()} />
    </Template>
  );
}
